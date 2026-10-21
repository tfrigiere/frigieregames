import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLang } from "@/lib/i18n";
import { bridge, fmtSize, PoweredBy, useIsLauncher } from "@/lib/launcher";

const DEVICE_KEY = "frigiere_device_id";

function getDeviceId(): string {
  let id = localStorage.getItem(DEVICE_KEY);
  if (!id) {
    id = crypto.randomUUID().replace(/-/g, "");
    localStorage.setItem(DEVICE_KEY, id);
  }
  return id;
}

type Stats = { clicks: number; players: number };

export function PlayButton({
  projectId,
  link,
  label,
  name,
  variant = "play",
}: {
  projectId: string;
  link: string;
  label?: string | undefined;
  name?: string | undefined;
  variant?: "play" | "access" | undefined;
}) {
  const [stats, setStats] = useState<Stats | null>(null);
  const { lang, t } = useLang();
  const app = useIsLauncher();
  const url = link.replace(/^http:\/\//, "https://");
  const [installed, setInstalled] = useState(false);
  const [modal, setModal] = useState<null | { size: number; pct: number; busy: boolean; shortcut: boolean }>(null);
  const [intro, setIntro] = useState(false);
  const fr = lang === "fr";

  useEffect(() => {
    let active = true;
    supabase
      .from("project_stats")
      .select("clicks, players")
      .eq("project_id", projectId)
      .maybeSingle()
      .then(({ data }) => {
        if (active && data) setStats({ clicks: Number(data.clicks), players: Number(data.players) });
      });
    return () => {
      active = false;
    };
  }, [projectId]);

  useEffect(() => {
    const b = bridge();
    if (!app || !b) return;
    const check = () => b.installed().then((d) => setInstalled(!!d[projectId]));
    check();
    window.addEventListener("launcher-installed", check);
    return () => window.removeEventListener("launcher-installed", check);
  }, [app, projectId]);

  const record = () => {
    setStats((s) => (s ? { ...s, clicks: s.clicks + 1 } : s));
    supabase
      .rpc("record_play", { _project_id: projectId, _device_id: getDeviceId() })
      .then(({ data }) => {
        const row = Array.isArray(data) ? data[0] : data;
        if (row) setStats({ clicks: Number(row.clicks), players: Number(row.players) });
      });
  };

  const launch = useCallback(() => { setIntro(false); void bridge()?.play(url); }, [url]);

  const fmt = (n: number) => n.toLocaleString(fr ? "fr-FR" : "en-US");
  const btnText = label ?? t("play");
  const isAccess = variant === "access";
  const statsEl = (
    <span className="play-stats">
      <span className={`play-stat${isAccess ? " play-stat-access" : ""}`} title={t("clicksTitle")}>
        <svg viewBox="0 0 24 24" aria-hidden="true" className="play-stat-icon"><path fill="currentColor" d="M7 3.5a1 1 0 0 1 1.6-.8l10.2 7.6a1 1 0 0 1-.4 1.79l-4.2.86 2.55 4.42a1 1 0 0 1-.37 1.37l-2.1 1.2a1 1 0 0 1-1.37-.37l-2.55-4.42-2.8 3.27A1 1 0 0 1 5.8 17.7z" /></svg>
        {stats ? fmt(stats.clicks) : "—"}
      </span>
      <span className={`play-stat${isAccess ? " play-stat-access" : ""}`} title={t("playersTitle")}>
        <svg viewBox="0 0 24 24" aria-hidden="true" className="play-stat-icon"><path fill="currentColor" d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9m0 1.8c-3.6 0-8 1.8-8 4.6V21h16v-2.6c0-2.8-4.4-4.6-8-4.6" /></svg>
        {stats ? fmt(stats.players) : "—"}
      </span>
    </span>
  );

  if (app && bridge()) {
    const openModal = async () => {
      setModal({ size: 0, pct: 0, busy: false, shortcut: true });
      const size = await bridge()!.size(url);
      setModal((m) => (m ? { ...m, size } : m));
    };
    const download = async () => {
      const b = bridge()!;
      setModal((m) => (m ? { ...m, busy: true } : m));
      const off = b.onProgress((p) => p.id === projectId && setModal((m) => (m ? { ...m, pct: p.total ? Math.round((p.got / p.total) * 100) : Math.min(95, m.pct + 5) } : m)));
      try { await b.install({ id: projectId, name: name ?? projectId, url, shortcut: modal?.shortcut ?? false }); setInstalled(true); } finally { off(); setModal(null); }
    };
    return (
      <>
        {installed ? (
          <button type="button" className={isAccess ? "btn-access" : "btn-play"} onClick={() => { record(); setIntro(true); }}>
            <span>▶ {fr ? "JOUER" : "PLAY"}</span>{statsEl}
          </button>
        ) : (
          <button type="button" className="btn-play" onClick={openModal}><span>⬇ {fr ? "TÉLÉCHARGER JEU" : "DOWNLOAD GAME"}</span></button>
        )}
        {modal && (
          <div className="launcher-overlay">
            <div className="launcher-panel">
              <h2 className="ice-title">{name ?? projectId}</h2>
              <p className="text-center">{fr ? "Poids" : "Size"} : <strong>{modal.size ? fmtSize(modal.size) : "…"}</strong></p>
              {modal.busy ? (
                <><div className="launcher-bar"><div style={{ width: modal.pct + "%" }} /></div><p className="text-center font-bold">{modal.pct} %</p></>
              ) : (
                <>
                  <label className="launcher-check"><input type="checkbox" checked={modal.shortcut} onChange={(e) => setModal({ ...modal, shortcut: e.target.checked })} />{fr ? "Créer un raccourci sur le bureau" : "Create a desktop shortcut"}</label>
                  <div className="flex justify-between gap-3"><button className="launcher-btn-ghost" onClick={() => setModal(null)}>{fr ? "Annuler" : "Cancel"}</button><button className="btn-play" onClick={download}>{fr ? "TÉLÉCHARGER" : "DOWNLOAD"}</button></div>
                </>
              )}
            </div>
          </div>
        )}
        {intro && <PoweredBy product={isAccess} onDone={launch} />}
      </>
    );
  }

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" onClick={record} className={isAccess ? "btn-access" : "btn-play"}>
      <span>▶ {btnText}</span>
      {statsEl}
    </a>
  );
}

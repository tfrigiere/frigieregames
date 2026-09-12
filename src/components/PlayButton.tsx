import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLang } from "@/lib/i18n";

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
  variant = "play",
}: {
  projectId: string;
  link: string;
  label?: string | undefined;
  variant?: "play" | "access" | undefined;
}) {
  const [stats, setStats] = useState<Stats | null>(null);
  const { lang, t } = useLang();

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

  const handleClick = () => {
    // Optimistic display, exact values come back from the server
    setStats((s) => (s ? { ...s, clicks: s.clicks + 1 } : s));
    supabase
      .rpc("record_play", { _project_id: projectId, _device_id: getDeviceId() })
      .then(({ data }) => {
        const row = Array.isArray(data) ? data[0] : data;
        if (row) setStats({ clicks: Number(row.clicks), players: Number(row.players) });
      });
  };

  const fmt = (n: number) => n.toLocaleString(lang === "fr" ? "fr-FR" : "en-US");

  const btnText = label ?? t("play");
  const isAccess = variant === "access";

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={isAccess ? "btn-access" : "btn-play"}
    >
      <span>▶ {btnText}</span>
      <span className="play-stats">
        <span className={`play-stat${isAccess ? " play-stat-access" : ""}`} title={t("clicksTitle")}>
          <svg viewBox="0 0 24 24" aria-hidden="true" className="play-stat-icon">
            <path
              fill="currentColor"
              d="M7 3.5a1 1 0 0 1 1.6-.8l10.2 7.6a1 1 0 0 1-.4 1.79l-4.2.86 2.55 4.42a1 1 0 0 1-.37 1.37l-2.1 1.2a1 1 0 0 1-1.37-.37l-2.55-4.42-2.8 3.27A1 1 0 0 1 5.8 17.7z"
            />
          </svg>
          {stats ? fmt(stats.clicks) : "—"}
        </span>
        <span className={`play-stat${isAccess ? " play-stat-access" : ""}`} title={t("playersTitle")}>
          <svg viewBox="0 0 24 24" aria-hidden="true" className="play-stat-icon">
            <path
              fill="currentColor"
              d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9m0 1.8c-3.6 0-8 1.8-8 4.6V21h16v-2.6c0-2.8-4.4-4.6-8-4.6"
            />
          </svg>
          {stats ? fmt(stats.players) : "—"}
        </span>
      </span>
    </a>
  );
}

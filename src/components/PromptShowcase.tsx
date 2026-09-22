import { useEffect, useState } from "react";
import promptAsset from "@/assets/promptCA.txt.asset.json";
import { useLang } from "@/lib/i18n";

const FILE_NAME = "promptC-A_04092026";

export function PromptShowcase() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    if (!open || content !== null) return;
    fetch(promptAsset.url)
      .then((r) => r.text())
      .then(setContent)
      .catch(() => setContent("…"));
  }, [open, content]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section className="mx-auto max-w-3xl px-6 pb-24">
      <article className="rounded-2xl border border-border bg-card/70 px-6 py-8 shadow-elevated backdrop-blur sm:px-8">
        <h2 className="text-title-3d text-center text-2xl font-black uppercase tracking-tight sm:text-3xl">
          {t("promptTitleA")}{" "}
          <span className="font-black text-accent">Company Airports</span>{" "}
          {t("promptTitleB")}
        </h2>

        <div className="mt-8 flex flex-col items-center">
          <button type="button" onClick={() => setOpen(true)} className="notepad-btn">
            <span className="notepad-btn-inner">
              <span className="notepad-lines" aria-hidden="true" />
              <span className="notepad-label">.txt</span>
            </span>
          </button>
          <p className="mt-4 font-mono text-sm font-bold tracking-wide text-foreground/90 sm:text-base">
            {FILE_NAME}
          </p>
          <p className="mt-1 text-xs italic text-muted-foreground sm:text-sm">{t("promptChars")}</p>
        </div>

        <p className="mt-6 text-center text-xs font-medium tracking-wide text-muted-foreground/70">
          Made by Thomas F.
        </p>
      </article>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 p-4 backdrop-blur-md"
          onClick={() => setOpen(false)}
        >
          <div
            className="notepad-window relative flex max-h-[85vh] w-full max-w-3xl flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-black/20 bg-[oklch(0.88_0.02_250)] px-4 py-2">
              <span className="font-mono text-sm font-bold text-[oklch(0.25_0.02_250)]">
                {FILE_NAME}.txt
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={promptAsset.url}
                  download={`${FILE_NAME}.txt`}
                  className="font-mono text-xs font-bold text-[oklch(0.42_0.14_240)] underline underline-offset-2"
                >
                  {t("promptDownload")}
                </a>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={t("close")}
                  className="rounded px-2 text-lg font-bold leading-none text-[oklch(0.25_0.02_250)] hover:bg-black/10"
                >
                  ✕
                </button>
              </div>
            </div>
            <pre className="flex-1 overflow-auto whitespace-pre-wrap break-words bg-[oklch(0.98_0.01_95)] p-5 text-left font-mono text-xs leading-relaxed text-[oklch(0.22_0.02_250)] sm:text-sm">
              {content ?? t("promptLoading")}
            </pre>
          </div>
        </div>
      )}
    </section>
  );
}

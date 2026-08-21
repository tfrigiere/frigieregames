import { FlagFR, FlagEN } from "@/components/Flags";
import { useLang } from "@/lib/i18n";

export function LangSwitch() {
  const { lang, setLang, t } = useLang();

  return (
    <div className="lang-switch" role="group" aria-label={t("switchLang")}>
      <button
        type="button"
        onClick={() => setLang("fr")}
        aria-pressed={lang === "fr"}
        className={`lang-btn ${lang === "fr" ? "lang-btn-active" : ""}`}
      >
        <FlagFR className="lang-flag" />
        <span>FR</span>
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`lang-btn ${lang === "en" ? "lang-btn-active" : ""}`}
      >
        <FlagEN className="lang-flag" />
        <span>EN</span>
      </button>
    </div>
  );
}

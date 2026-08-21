import { FlagFR, FlagEN } from "@/components/Flags";
import { useLang } from "@/lib/i18n";

export function ProjectConditions({
  platforms,
  langs,
  players,
}: {
  platforms: string;
  langs: ("fr" | "en")[];
  players?: number;
}) {
  const { t } = useLang();

  return (
    <section className="conditions-box">
      <h4 className="conditions-title">{t("conditions")}</h4>
      <p className="conditions-line">
        {t("platforms")} : <strong>{platforms}</strong>
      </p>
      <p className="conditions-line">
        {t("languages")}
        <span className="conditions-langs-alt">{t("languagesAlt")}</span> :{" "}
        <span className="conditions-flags">
          {langs.map((l) => (
            <span key={l}>{l === "fr" ? <FlagFR /> : <FlagEN />}</span>
          ))}
        </span>
      </p>
      {players !== undefined && (
        <p className="conditions-line">
          {t("playersRequired")} : <strong>{players}</strong>
        </p>
      )}
    </section>
  );
}

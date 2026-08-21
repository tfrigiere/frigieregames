function FlagFR() {
  return (
    <svg viewBox="0 0 9 6" className="flag-img" role="img" aria-label="Français">
      <rect width="3" height="6" x="0" fill="#0055A4" />
      <rect width="3" height="6" x="3" fill="#FFFFFF" />
      <rect width="3" height="6" x="6" fill="#EF4135" />
    </svg>
  );
}

function FlagEN() {
  return (
    <svg viewBox="0 0 60 30" className="flag-img" role="img" aria-label="English">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 60,30M60,0 0,30" stroke="#FFF" strokeWidth="6" />
      <path d="M0,0 60,30M60,0 0,30" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 V30M0,15 H60" stroke="#FFF" strokeWidth="10" />
      <path d="M30,0 V30M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

export function ProjectConditions({
  platforms,
  langs,
}: {
  platforms: string;
  langs: ("fr" | "en")[];
}) {
  return (
    <section className="conditions-box">
      <h4 className="conditions-title">Conditions</h4>
      <p className="conditions-line">
        Plateformes supportées : <strong>{platforms}</strong>
      </p>
      <p className="conditions-line">
        Langues<span className="conditions-langs-alt">/languages</span> :{" "}
        <span className="conditions-flags">
          {langs.map((l) => (
            <span key={l}>{l === "fr" ? <FlagFR /> : <FlagEN />}</span>
          ))}
        </span>
      </p>
    </section>
  );
}

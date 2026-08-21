export function FlagFR({ className = "flag-img" }: { className?: string }) {
  return (
    <svg viewBox="0 0 9 6" className={className} role="img" aria-label="Français">
      <rect width="3" height="6" x="0" fill="#0055A4" />
      <rect width="3" height="6" x="3" fill="#FFFFFF" />
      <rect width="3" height="6" x="6" fill="#EF4135" />
    </svg>
  );
}

export function FlagEN({ className = "flag-img" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 30" className={className} role="img" aria-label="English">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 60,30M60,0 0,30" stroke="#FFF" strokeWidth="6" />
      <path d="M0,0 60,30M60,0 0,30" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 V30M0,15 H60" stroke="#FFF" strokeWidth="10" />
      <path d="M30,0 V30M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

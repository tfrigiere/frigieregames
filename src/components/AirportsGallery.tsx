import { useState } from "react";
import { useLang } from "@/lib/i18n";
import img1 from "@/assets/air-1.png.asset.json";
import img2 from "@/assets/air-2.png.asset.json";
import img3 from "@/assets/air-3.png.asset.json";
import img4 from "@/assets/air-4.png.asset.json";

type Slide = {
  src: string;
  alt: string;
  parts: { text: string; hl?: boolean }[];
};

const slidesFr: Slide[] = [
  {
    src: img1.url,
    alt: "Carte de France avec une ligne aérienne entre Lyon et Marseille",
    parts: [
      { text: "DÉVELOPPEZ VOTRE" },
      { text: "RÉSEAU AÉRIEN À TRAVERS LA FRANCE", hl: true },
      { text: "!" },
    ],
  },
  {
    src: img2.url,
    alt: "Fiche de l'aéroport Marseille Provence avec son taux d'occupation",
    parts: [
      { text: "MÉFIEZ-VOUS QUE VOS" },
      { text: "AÉROPORTS NE SOIENT PAS REMPLIS", hl: true },
      { text: "!" },
    ],
  },
  {
    src: img3.url,
    alt: "Menu de construction d'un nouvel aéroport",
    parts: [
      { text: "CONSTRUISEZ DE" },
      { text: "NOUVEAUX AÉROPORTS", hl: true },
      { text: "!" },
      { text: "84", hl: true },
      { text: "AÉROPORTS DISPONIBLES !" },
    ],
  },
  {
    src: img4.url,
    alt: "Vue complète du jeu Company Airports avec plusieurs lignes aériennes",
    parts: [
      { text: "CONTINUEZ DE" },
      { text: "DÉVELOPPER VOTRE RÉSEAU", hl: true },
      { text: "!" },
    ],
  },
];

const slidesEn: Slide[] = [
  {
    src: img1.url,
    alt: "Map of France with an air route between Lyon and Marseille",
    parts: [
      { text: "GROW YOUR" },
      { text: "AIR NETWORK ACROSS FRANCE", hl: true },
      { text: "!" },
    ],
  },
  {
    src: img2.url,
    alt: "Marseille Provence airport panel with its occupancy rate",
    parts: [
      { text: "WATCH OUT THAT YOUR" },
      { text: "AIRPORTS DON'T GET FULL", hl: true },
      { text: "!" },
    ],
  },
  {
    src: img3.url,
    alt: "Menu to build a new airport",
    parts: [
      { text: "BUILD" },
      { text: "NEW AIRPORTS", hl: true },
      { text: "!" },
      { text: "84", hl: true },
      { text: "AIRPORTS AVAILABLE !" },
    ],
  },
  {
    src: img4.url,
    alt: "Full view of the Company Airports game with several air routes",
    parts: [
      { text: "KEEP" },
      { text: "GROWING YOUR NETWORK", hl: true },
      { text: "!" },
    ],
  },
];

export function AirportsGallery() {
  const { lang, t } = useLang();
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const slides = lang === "fr" ? slidesFr : slidesEn;

  const go = (dir: number) => setIndex((i) => (i + dir + slides.length) % slides.length);

  const renderCaption = (s: Slide) =>
    s.parts.map((p, i) => {
      const glue = p.text === "!";
      return (
        <span key={i}>
          {i > 0 && !glue ? " " : ""}
          {p.hl ? <span className="air-hl">{p.text}</span> : p.text}
        </span>
      );
    });

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl border border-border bg-background/60 shadow-elevated">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s) => (
            <figure key={s.src} className="w-full shrink-0">
              <img
                src={s.src}
                alt={s.alt}
                onClick={() => setZoom(true)}
                className="air-shot aspect-[16/10] w-full cursor-zoom-in object-contain"
              />
              <figcaption className="banner-strip-air">{renderCaption(s)}</figcaption>
            </figure>
          ))}
        </div>

        <button
          type="button"
          aria-label={t("prevImage")}
          onClick={() => go(-1)}
          className="gallery-arrow left-3"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label={t("nextImage")}
          onClick={() => go(1)}
          className="gallery-arrow right-3"
        >
          ›
        </button>

        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              aria-label={`${t("goToImage")} ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition-all ${
                i === index ? "w-5 bg-accent" : "bg-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>

      {zoom && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-background/70 p-4 backdrop-blur-xl"
          onClick={() => setZoom(false)}
        >
          <div
            className="relative max-h-[75vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={slides[index]!.src}
              alt={slides[index]!.alt}
              className="max-h-[75vh] w-full rounded-xl border border-border object-contain shadow-elevated"
            />
            <button
              type="button"
              aria-label={t("close")}
              onClick={() => setZoom(false)}
              className="gallery-arrow -right-2 -top-2 !top-0 translate-x-1/3 -translate-y-1/3 text-xl"
            >
              ✕
            </button>
          </div>

          <div className="flex items-center gap-6" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              aria-label={t("prevImage")}
              onClick={() => go(-1)}
              className="gallery-arrow !static"
            >
              ‹
            </button>
            <span className="font-display text-lg font-bold text-foreground">
              {index + 1}/{slides.length}
            </span>
            <button
              type="button"
              aria-label={t("nextImage")}
              onClick={() => go(1)}
              className="gallery-arrow !static"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </>
  );
}

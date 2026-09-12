import { useState } from "react";
import { useLang } from "@/lib/i18n";
import eteImg from "@/assets/vacances-ete.png.asset.json";
import toussaintImg from "@/assets/vacances-toussaint.png.asset.json";
import fevrierImg from "@/assets/vacances-fevrier.png.asset.json";
import paquesImg from "@/assets/vacances-paques.png.asset.json";

type Slide = {
  src: string;
  alt: string;
  before: string;
  highlight: string;
  after: string;
};

const slidesFr: Slide[] = [
  {
    src: eteImg.url,
    alt: "Compte à rebours avant les prochaines vacances d'été 2027",
    before: "REGARDEZ LA PROGRESSION AVANT LES",
    highlight: "VACANCES D'ÉTÉ PROCHAINES",
    after: "…",
  },
  {
    src: toussaintImg.url,
    alt: "Compte à rebours avant les prochaines vacances de la Toussaint",
    before: "… OU POUR",
    highlight: "LES PROCHAINES VACANCES À VENIR",
    after: "!",
  },
  {
    src: fevrierImg.url,
    alt: "Compte à rebours avant les prochaines vacances de février",
    before: "SUIVEZ AUSSI LES VACANCES DE",
    highlight: "FÉVRIER",
    after: "ET DE PÂQUES !",
  },
  {
    src: paquesImg.url,
    alt: "Compte à rebours avant les prochaines vacances de Pâques",
    before: "PRÊT POUR LES",
    highlight: "PROCHAINES VACANCES",
    after: "?",
  },
];

const slidesEn: Slide[] = [
  {
    src: eteImg.url,
    alt: "Countdown to the next summer holidays 2027",
    before: "WATCH THE PROGRESS BEFORE THE",
    highlight: "NEXT SUMMER HOLIDAYS",
    after: "…",
  },
  {
    src: toussaintImg.url,
    alt: "Countdown to the next Toussaint holiday",
    before: "… OR FOR THE",
    highlight: "NEXT UPCOMING HOLIDAYS",
    after: "!",
  },
  {
    src: fevrierImg.url,
    alt: "Countdown to the next February holidays",
    before: "ALSO TRACK THE",
    highlight: "FEBRUARY",
    after: "AND EASTER HOLIDAYS!",
  },
  {
    src: paquesImg.url,
    alt: "Countdown to the next Easter holidays",
    before: "READY FOR THE",
    highlight: "NEXT HOLIDAYS",
    after: "?",
  },
];

export function VacancesGallery() {
  const { lang, t } = useLang();
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const slides = lang === "fr" ? slidesFr : slidesEn;

  const go = (dir: number) => setIndex((i) => (i + dir + slides.length) % slides.length);

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
                className="vacances-shot aspect-[16/10] w-full cursor-zoom-in object-contain"
              />
              <figcaption className="banner-strip-vacances">
                {s.before && <span>{s.before}</span>}
                <span className="vacances-hl">{s.highlight}</span>
                <span>{s.after}</span>
              </figcaption>
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
          <div className="relative max-h-[75vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
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

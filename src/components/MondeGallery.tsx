import { useState } from "react";
import { useLang } from "@/lib/i18n";
import modesImg from "@/assets/monde-modes-v2.png.asset.json";
import categoriesImg from "@/assets/monde-categories.png.asset.json";
import triImg from "@/assets/monde-tri-v2.png.asset.json";

type Slide = {
  src: string;
  alt: string;
  before: string;
  highlight: string;
  after: string;
};

const slidesFr: Slide[] = [
  {
    src: modesImg.url,
    alt: "Accueil du Monde des Géographes avec les différents modes de jeu",
    before: "",
    highlight: "4",
    after: "DIFFÉRENTS MODES DE JEU SUR LE SITE",
  },
  {
    src: categoriesImg.url,
    alt: "Liste des catégories de quiz du Monde des Géographes",
    before: "PLUSIEURS",
    highlight: "DIZAINES",
    after: "DE CATÉGORIES POUR S'AMUSER !",
  },
  {
    src: triImg.url,
    alt: "Panneau de tri des catégories du Monde des Géographes",
    before: "UN",
    highlight: "SYSTÈME DE TRI INTELLIGENT",
    after: "POUR TROUVER VOS CATÉGORIES FAVORITES !",
  },
];

const slidesEn: Slide[] = [
  {
    src: modesImg.url,
    alt: "Monde des Géographes home page with the different game modes",
    before: "",
    highlight: "4",
    after: "DIFFERENT GAME MODES ON THE SITE",
  },
  {
    src: categoriesImg.url,
    alt: "List of quiz categories on Monde des Géographes",
    before: "SEVERAL",
    highlight: "DOZENS",
    after: "OF CATEGORIES TO HAVE FUN WITH !",
  },
  {
    src: triImg.url,
    alt: "Category sorting panel on Monde des Géographes",
    before: "A",
    highlight: "SMART SORTING SYSTEM",
    after: "TO FIND YOUR FAVOURITE CATEGORIES !",
  },
];

export function MondeGallery() {
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
              className="aspect-[16/10] w-full cursor-zoom-in object-cover object-top"
            />
            <figcaption className="banner-strip">
              {s.before && <span>{s.before}</span>}
              <span className="banner-highlight">{s.highlight}</span>
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

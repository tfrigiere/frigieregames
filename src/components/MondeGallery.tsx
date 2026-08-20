import { useState } from "react";
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

const slides: Slide[] = [
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

export function MondeGallery() {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);

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
        aria-label="Image précédente"
        onClick={() => go(-1)}
        className="gallery-arrow left-3"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Image suivante"
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
            aria-label={`Aller à l'image ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full transition-all ${
              i === index ? "w-5 bg-accent" : "bg-foreground/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

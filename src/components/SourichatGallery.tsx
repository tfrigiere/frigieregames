import { useState } from "react";
import img1 from "@/assets/souri-1.png.asset.json";
import img2 from "@/assets/souri-2.png.asset.json";
import img3 from "@/assets/souri-3.png.asset.json";
import img4 from "@/assets/souri-4.png.asset.json";

type Slide = {
  src: string;
  alt: string;
  parts: { text: string; hl?: "souris" | "chat" | "theme"; small?: boolean }[];
};

const slides: Slide[] = [
  {
    src: img1.url,
    alt: "Partie en cours vue par la souris sur Sourichat.map",
    parts: [
      { text: "FUYEZ EN TANT QUE" },
      { text: "SOURIS", hl: "souris" },
      { text: "POUR NE PAS VOUS FAIRE ATTRAPER" },
    ],
  },
  {
    src: img2.url,
    alt: "Partie en cours vue par le chat sur Sourichat.map",
    parts: [
      { text: "ESSAYEZ D'ATTRAPER LA SOURIS EN TANT QUE" },
      { text: "CHAT", hl: "chat" },
      { text: "!" },
    ],
  },
  {
    src: img3.url,
    alt: "Menu de paramétrage d'une partie sur Sourichat.map",
    parts: [
      { text: "PARAMÉTREZ UNE PARTIE" },
      { text: "FACILEMENT", hl: "theme" },
      { text: "GRÂCE À CE" },
      { text: "MENU DE PARAMÉTRAGE ERGONOMIQUE ET FACILE D'UTILISATION", hl: "theme" },
      { text: "!" },
    ],
  },
  {
    src: img4.url,
    alt: "Définition d'une zone de jeu avec des nœuds sur Sourichat.map",
    parts: [
      { text: "DÉFINISSEZ UNE ZONE DE JEU" },
      { text: "FACILEMENT", hl: "theme" },
      { text: "GRÂCE À" },
      { text: "L'UTILISATION DE NŒUDS", hl: "theme" },
      { text: "nodes", hl: "theme", small: true },
      { text: "!" },
    ],
  },
];

export function SourichatGallery() {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);

  const go = (dir: number) => setIndex((i) => (i + dir + slides.length) % slides.length);

  const renderCaption = (s: Slide) =>
    s.parts.map((p, i) => {
      const glue = p.text === "!";
      return (
        <span key={i}>
          {i > 0 && !glue ? " " : ""}
          {p.hl ? (
            <span className={`souri-hl-${p.hl}${p.small ? " souri-hl-small" : ""}`}>
              {p.text}
            </span>
          ) : (
            p.text
          )}
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
                className="souri-shot aspect-[4/3] w-full cursor-zoom-in object-contain"
              />
              <figcaption className="banner-strip-souri">{renderCaption(s)}</figcaption>
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

      {zoom && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-background/70 p-4 backdrop-blur-xl"
          onClick={() => setZoom(false)}
        >
          <div className="relative max-h-[75vh] w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={slides[index]!.src}
              alt={slides[index]!.alt}
              className="max-h-[75vh] w-full rounded-xl border border-border object-contain shadow-elevated"
            />
            <button
              type="button"
              aria-label="Fermer"
              onClick={() => setZoom(false)}
              className="gallery-arrow -right-2 -top-2 !top-0 translate-x-1/3 -translate-y-1/3 text-xl"
            >
              ✕
            </button>
          </div>

          <div className="flex items-center gap-6" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              aria-label="Image précédente"
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
              aria-label="Image suivante"
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

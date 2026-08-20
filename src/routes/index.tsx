import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import frigiereLogo from "@/assets/frigiere.png.asset.json";
import mondeLogo from "@/assets/monde.png.asset.json";
import sourichatLogo from "@/assets/sourichat.png.asset.json";
import airportsLogo from "@/assets/airports.png.asset.json";
import { MondeGallery } from "@/components/MondeGallery";
import { SourichatGallery } from "@/components/SourichatGallery";
import { AirportsGallery } from "@/components/AirportsGallery";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Frigiere.games — Mes projets de jeux et sites web" },
      {
        name: "description",
        content:
          "Frigiere.games rassemble mes projets : Monde des Géographes, Sourichat.map et Company Airports. Découvrez-les et jouez.",
      },
      { property: "og:title", content: "Frigiere.games — Mes projets" },
      {
        property: "og:description",
        content:
          "Monde des Géographes, Sourichat.map et Company Airports : trois projets à découvrir sur Frigiere.games.",
      },
      { property: "og:image", content: `https://frigiere.games${frigiereLogo.url}` },
      { name: "twitter:image", content: `https://frigiere.games${frigiereLogo.url}` },
    ],
  }),
  component: Index,
});

type Project = {
  id: string;
  name: string;
  logo: string;
  beta?: boolean;
  link: string;
  description: React.ReactNode;
};

const projects: Project[] = [
  {
    id: "monde",
    name: "Monde des Géographes",
    logo: mondeLogo.url,
    link: "https://mondedesgeographes.lovable.app/",
    description: (
      <>
        <MondeGallery />
        <p>

          Un site pour s'entraîner en géographie, il y a plusieurs modes pour apprendre tout en
          s'amusant.
        </p>
        <p>
          Il y a des missions rapides, des modes journaliers et hebdomadaires ou encore le cœur du
          site : <strong>LES CATEGORIES</strong>
        </p>
        <p>
          Il y a aussi des bundles pour débloquer de nouvelles catégories plus ciblées sur des
          régions du monde et donc plus difficiles.
        </p>
      </>
    ),
  },
  {
    id: "sourichat",
    name: "Sourichat.map",
    logo: sourichatLogo.url,
    beta: true,
    link: "http://sourichatmap.lovable.app/",
    description: (
      <>
        <SourichatGallery />
        <p>
          Un site uniquement disponible sur mobile pour jouer au jeu du chat et de la souris (jeu
          enfantin) grandeur nature sur grand terrain inspiré par les très célèbres ytbeur{" "}
          <a
            href="https://www.youtube.com/@FuzeIII"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent underline underline-offset-4 hover:text-accent/80"
          >
            Fuze
          </a>{" "}
          et{" "}
          <a
            href="https://www.youtube.com/@Aywen"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent underline underline-offset-4 hover:text-accent/80"
          >
            Aywen
          </a>
          . Ce jeu incarne 2 rôles :
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Le chat qui a pour but de toucher la souris. Sur son appareil, il a une visualisation
            d'une zone où se trouve la souris (et pas précisément où elle est) et les dimensions de
            la zone.
          </li>
          <li>
            La souris, quant à elle, n'a que sa position et les dimensions de la zone, son but est
            de juste « fuir ».
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "airports",
    name: "Company Airports",
    logo: airportsLogo.url,
    beta: true,
    link: "https://companyairports.lovable.app/",
    description: (
      <>
        <AirportsGallery />
        <p>
          Un site de type jeu pur qui permet de développer son réseau aérien dans toute la France,
          c'est un jeu de type « tycoon » et gestion.
        </p>
      </>
    ),
  },
];

function Index() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-background bg-hero-glow">
      <section className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-20 md:flex-row md:justify-center md:gap-14 md:py-28">
        <img
          src={frigiereLogo.url}
          alt="Logo Frigiere.games : cube de cristal glacé en forme de F"
          className="w-52 drop-shadow-[0_20px_45px_rgba(80,190,255,0.45)] md:w-72"
        />
        <h1 className="text-title-3d text-center text-5xl font-black uppercase tracking-tight sm:text-6xl md:text-left md:text-7xl">
          Frigiere
          <span className="text-accent">.games</span>
        </h1>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24">
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground/90">Mes projets</h2>
        <div className="space-y-5">
          {projects.map((p) => {
            const isOpen = open === p.id;
            return (
              <article
                key={p.id}
                className="overflow-hidden rounded-2xl border border-border bg-card/70 shadow-elevated backdrop-blur"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : p.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-accent/10"
                >
                  <img
                    src={p.logo}
                    alt={`Logo ${p.name}`}
                    className="h-14 w-14 shrink-0 object-contain"
                  />
                  <span className="flex flex-1 flex-wrap items-center gap-3">
                    <span className="text-lg font-bold text-card-foreground sm:text-xl">
                      {p.name}
                    </span>
                    {p.beta && <span className="badge-beta">BETA</span>}
                  </span>
                  <span
                    className={`text-accent transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  >
                    ▼
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-4 border-t border-border px-5 py-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {p.description}
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-play"
                      >
                        ▶ PLAY
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24">
        <article className="rounded-2xl border border-border bg-card/70 px-6 py-8 shadow-elevated backdrop-blur sm:px-8">
          <h2 className="text-title-3d text-center text-3xl font-black uppercase tracking-tight sm:text-4xl">
            À propos du créateur
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              Salut ! Je suis un jeune lycéen Auvergnat. Quand je ne suis pas en cours, je m'amuse à
              mixer mes deux plus grandes passions : la géographie et l'informatique.{" "}
              <strong className="font-bold text-accent">FRIGIERE.GAMES</strong> est né d'une envie de
              créer des projets liés à mes passions.
            </p>
            <p>
              Grâce à Lovable, une IA de développement de site, c'est une opportunité de créer des
              sites plus facilement pour expérimenter plein de petits projets de chambre.
            </p>
          </div>

          <h3 className="mt-10 text-center text-lg font-bold uppercase tracking-[0.18em] text-accent drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] sm:text-xl">
            Note du créateur
          </h3>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Le développement de ces petits jeux sert à tuer l'ennui pendant les grandes vacances
            d'été !
          </p>

          <p className="mt-8 text-right text-xs font-semibold uppercase tracking-[0.2em] text-accent/80 sm:text-sm">
            20 Août 2026
          </p>
        </article>
      </section>
    </main>
  );
}

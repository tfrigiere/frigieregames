import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import frigiereLogo from "@/assets/frigiere.png.asset.json";
import mondeLogo from "@/assets/monde.png.asset.json";
import vacancesLogo from "@/assets/vacances-logo.png.asset.json";
import sourichatLogo from "@/assets/sourichat.png.asset.json";
import airportsLogo from "@/assets/airports.png.asset.json";
import frigePp from "@/assets/frige-pp.png.asset.json";
import { MondeGallery } from "@/components/MondeGallery";
import { VacancesGallery } from "@/components/VacancesGallery";
import { SourichatGallery } from "@/components/SourichatGallery";
import { AirportsGallery } from "@/components/AirportsGallery";
import { PlayButton } from "@/components/PlayButton";
import { ProjectConditions } from "@/components/ProjectConditions";
import { CommentsSection } from "@/components/CommentsSection";
import { PromptShowcase } from "@/components/PromptShowcase";
import { LangSwitch } from "@/components/LangSwitch";
import { LangProvider, useLang, type fr as FrDict } from "@/lib/i18n";

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
  component: IndexPage,
});

type T = (key: keyof typeof FrDict) => string;

type Project = {
  id: string;
  name: string;
  logo: string;
  beta?: boolean;
  link: string;
  platforms: (t: T) => string;
  langs: ("fr" | "en")[];
  players?: number;
  description: (t: T) => React.ReactNode;
};

const projects: Project[] = [
  {
    id: "monde",
    name: "Monde des Géographes",
    logo: mondeLogo.url,
    link: "https://mondedesgeographes.lovable.app/",
    platforms: (t) => t("platformsMonde"),
    langs: ["fr", "en"],
    description: (t) => (
      <>
        <MondeGallery />
        <p>{t("mondeD1")}</p>
        <p>
          {t("mondeD2a")} <strong>{t("mondeD2b")}</strong>
        </p>
        <p>{t("mondeD3")}</p>
      </>
    ),
  },
  {
    id: "vacances",
    name: "A Quand les Prochaines Vacances ?",
    logo: vacancesLogo.url,
    link: "https://aquandlesprochainesvacances.lovable.app/",
    platforms: (t) => t("platformsVacances"),
    langs: ["fr"],
    description: (t) => (
      <>
        <VacancesGallery />
        <p>{t("vacancesD1")}</p>
        <p>{t("vacancesD2")}</p>
      </>
    ),
  },
  {
    id: "sourichat",
    name: "Sourichat.map",
    logo: sourichatLogo.url,
    beta: true,
    link: "http://sourichatmap.lovable.app/",
    platforms: (t) => t("platformsSouri"),
    langs: ["fr", "en"],
    players: 2,
    description: (t) => (
      <>
        <SourichatGallery />
        <p>
          {t("souriD1a")}{" "}
          <a
            href="https://www.youtube.com/@FuzeIII"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent underline underline-offset-4 hover:text-accent/80"
          >
            Fuze
          </a>{" "}
          {t("souriD1b")}{" "}
          <a
            href="https://www.youtube.com/@Aywen"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent underline underline-offset-4 hover:text-accent/80"
          >
            Aywen
          </a>
          {t("souriD1c")}
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>{t("souriLi1")}</li>
          <li>{t("souriLi2")}</li>
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
    platforms: (t) => t("platformsAir"),
    langs: ["fr"],
    description: (t) => (
      <>
        <AirportsGallery />
        <p>{t("airD1")}</p>
      </>
    ),
  },
];

function IndexPage() {
  return (
    <LangProvider>
      <Index />
    </LangProvider>
  );
}

function Index() {
  const [open, setOpen] = useState<string | null>(null);
  const { t } = useLang();

  return (
    <main className="min-h-screen bg-background bg-hero-glow">
      <div className="mx-auto flex max-w-6xl justify-end px-6 pt-5">
        <LangSwitch />
      </div>

      <section className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 pb-20 pt-8 md:flex-row md:justify-center md:gap-14 md:pb-28">
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
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground/90">
          {t("projectsTitle")}
        </h2>
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
                      {p.description(t)}
                      <ProjectConditions
                        platforms={p.platforms(t)}
                        langs={p.langs}
                        players={p.players}
                      />
                      <PlayButton
                        projectId={p.id}
                        link={p.link}
                        label={p.id === "vacances" ? t("access") : undefined}
                        variant={p.id === "vacances" ? "access" : "play"}
                      />
                      <CommentsSection projectId={p.id} />
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
            {t("aboutTitle")}
          </h2>

          <div className="mt-8 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <img
              src={frigePp.url}
              alt="Frige"
              className="h-28 w-28 rounded-full border-4 border-accent object-cover shadow-elevated sm:h-36 sm:w-36"
            />
            <span className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
              Frige
            </span>
          </div>

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              {t("aboutP1a")} <strong className="font-bold text-accent">FRIGIERE.GAMES</strong>{" "}
              {t("aboutP1b")}
            </p>
            <p>{t("aboutP2")}</p>
          </div>

          <h3 className="mt-10 text-center text-lg font-bold uppercase tracking-[0.18em] text-accent drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] sm:text-xl">
            {t("noteTitle")}
          </h3>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t("noteBody")}
          </p>

          <p className="mt-8 text-right text-xs font-semibold uppercase tracking-[0.2em] text-accent/80 sm:text-sm">
            {t("date")}
          </p>
        </article>
      </section>

      <PromptShowcase />
    </main>
  );
}

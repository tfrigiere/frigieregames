import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "fr" | "en";

const STORAGE_KEY = "frigiere_lang";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (key: keyof typeof fr) => string };

const LangContext = createContext<Ctx>({ lang: "fr", setLang: () => {}, t: (k) => fr[k] });

export const fr = {
  projectsTitle: "Mes projets",
  conditions: "Conditions",
  platforms: "Plateformes supportées",
  languages: "Langues",
  languagesAlt: "/languages",
  playersRequired: "Nombre de joueurs requis",
  play: "PLAY",
  access: "ACCÉDER",
  clicksTitle: "Nombre total de clics dans le monde",
  playersTitle: "Nombre de joueurs uniques",
  commentsTitle: "Commentaires / Feedback",
  name: "Nom",
  nameHint: "(laissez vide pour apparaître en tant qu'« Utilisateur »)",
  message: "Message",
  messagePlaceholder: "Votre avis sur ce projet...",
  publish: "Publier",
  sending: "Envoi...",
  commentError: "Impossible d'envoyer le commentaire, réessayez.",
  noComments: "Aucun commentaire pour l'instant. Soyez le premier !",
  defaultUser: "Utilisateur",
  prevImage: "Image précédente",
  nextImage: "Image suivante",
  close: "Fermer",
  goToImage: "Aller à l'image",
  aboutTitle: "À propos du créateur",
  aboutP1a: "Salut ! Je suis un jeune lycéen Auvergnat. Quand je ne suis pas en cours, je m'amuse à mixer mes deux plus grandes passions : la géographie et l'informatique.",
  aboutP1b: "est né d'une envie de créer des projets liés à mes passions.",
  aboutP2: "Grâce à Lovable, une IA de développement de site, c'est une opportunité de créer des sites plus facilement pour expérimenter plein de petits projets de chambre.",
  noteTitle: "Note du créateur",
  noteBody: "Le développement de ces petits jeux sert à tuer l'ennui pendant les grandes vacances d'été !",
  date: "20 Août 2026",
  switchLang: "Changer la langue du site",
  platformsMonde: "PC & Téléphone",
  platformsSouri: "Téléphone uniquement",
  platformsAir: "PC uniquement",
  mondeD1: "Un site pour s'entraîner en géographie, il y a plusieurs modes pour apprendre tout en s'amusant.",
  mondeD2a: "Il y a des missions rapides, des modes journaliers et hebdomadaires ou encore le cœur du site :",
  mondeD2b: "LES CATÉGORIES",
  mondeD3: "Il y a aussi des bundles pour débloquer de nouvelles catégories plus ciblées sur des régions du monde et donc plus difficiles.",
  souriD1a: "Un site uniquement disponible sur mobile pour jouer au jeu du chat et de la souris (jeu enfantin) grandeur nature sur grand terrain inspiré par les très célèbres ytbeur",
  souriD1b: "et",
  souriD1c: ". Ce jeu incarne 2 rôles :",
  souriLi1: "Le chat qui a pour but de toucher la souris. Sur son appareil, il a une visualisation d'une zone où se trouve la souris (et pas précisément où elle est) et les dimensions de la zone.",
  souriLi2: "La souris, quant à elle, n'a que sa position et les dimensions de la zone, son but est de juste « fuir ».",
  airD1: "Un site de type jeu pur qui permet de développer son réseau aérien dans toute la France, c'est un jeu de type « tycoon » et gestion.",
  platformsVacances: "PC & Téléphone",
  vacancesD1: "Si vous avez pensez que les vacances sont dans une éternité, alors accélérez le cours du temps en découvrant le pourcentage avant les prochaines vacances.",
  vacancesD2: "Possibilités de vacances : Toussaint, Noel, Février, Pâques, Eté",
  vacancesBanner1Before: "REGARDEZ LA PROGRESSION AVANT LES",
  vacancesBanner1Highlight: "VACANCES D'ÉTÉ PROCHAINES",
  vacancesBanner1After: "…",
  vacancesBanner2Before: "… OU POUR",
  vacancesBanner2Highlight: "LES PROCHAINES VACANCES À VENIR",
  vacancesBanner2After: "!",
  vacancesBanner3Before: "SUIVEZ AUSSI LES VACANCES DE",
  vacancesBanner3Highlight: "FÉVRIER",
  vacancesBanner3After: "ET DE PÂQUES !",
  vacancesBanner4Before: "PRÊT POUR LES",
  vacancesBanner4Highlight: "PROCHAINES VACANCES",
  vacancesBanner4After: "?",
  promptTitleA: "Intéressé ? Observez un exemple de 1 de mes prompts sur",
  promptTitleB: "réalisé en début septembre 2026 :",
  promptOpen: "Ouvrir le prompt",
  promptChars: "Prompt de 4 500 caractères",
  promptDownload: "Télécharger le .txt",
  promptLoading: "Chargement...",
} as const;

export const en: Record<keyof typeof fr, string> = {
  projectsTitle: "My projects",
  conditions: "Requirements",
  platforms: "Supported platforms",
  languages: "Languages",
  languagesAlt: "/langues",
  playersRequired: "Players required",
  play: "PLAY",
  access: "ACCESS",
  clicksTitle: "Total clicks worldwide",
  playersTitle: "Unique players",
  commentsTitle: "Comments / Feedback",
  name: "Name",
  nameHint: "(leave empty to appear as “User”)",
  message: "Message",
  messagePlaceholder: "Your feedback about this project...",
  publish: "Post",
  sending: "Sending...",
  commentError: "Couldn't send the comment, please try again.",
  noComments: "No comments yet. Be the first!",
  defaultUser: "User",
  prevImage: "Previous image",
  nextImage: "Next image",
  close: "Close",
  goToImage: "Go to image",
  aboutTitle: "About the creator",
  aboutP1a: "Hi! I'm a young high-school student from Auvergne (France). When I'm not in class, I have fun mixing my two biggest passions: geography and computing.",
  aboutP1b: "was born from the wish to build projects tied to my passions.",
  aboutP2: "Thanks to Lovable, an AI website builder, it's an opportunity to create websites more easily and experiment with lots of small bedroom projects.",
  noteTitle: "Creator's note",
  noteBody: "Building these little games is a way to kill boredom during the long summer holidays!",
  date: "August 20, 2026",
  switchLang: "Change the website language",
  platformsMonde: "PC & Phone",
  platformsSouri: "Phone only",
  platformsAir: "PC only",
  mondeD1: "A website to train in geography, with several modes to learn while having fun.",
  mondeD2a: "There are quick missions, daily and weekly modes, and the heart of the site:",
  mondeD2b: "THE CATEGORIES",
  mondeD3: "There are also bundles to unlock new categories focused on specific world regions, and therefore harder.",
  souriD1a: "A mobile-only website to play real-life cat and mouse (the childhood game) on a large area, inspired by the very famous YouTubers",
  souriD1b: "and",
  souriD1c: ". The game has 2 roles:",
  souriLi1: "The cat, whose goal is to tag the mouse. On their device they see an area where the mouse is (not its exact position) and the size of that area.",
  souriLi2: "The mouse only has its own position and the size of the area; its goal is simply to flee.",
  airD1: "A pure game website where you develop your airline network across France — a tycoon and management game.",
  platformsVacances: "PC & Phone",
  vacancesD1: "If you feel like holidays are an eternity away, speed up time by discovering the percentage remaining until the next school break.",
  vacancesD2: "Holidays covered: Toussaint, Christmas, February, Easter, Summer",
  vacancesBanner1Before: "WATCH THE PROGRESS BEFORE THE",
  vacancesBanner1Highlight: "NEXT SUMMER HOLIDAYS",
  vacancesBanner1After: "…",
  vacancesBanner2Before: "… OR FOR THE",
  vacancesBanner2Highlight: "NEXT UPCOMING HOLIDAYS",
  vacancesBanner2After: "!",
  vacancesBanner3Before: "ALSO TRACK THE",
  vacancesBanner3Highlight: "FEBRUARY",
  vacancesBanner3After: "AND EASTER HOLIDAYS!",
  vacancesBanner4Before: "READY FOR THE",
  vacancesBanner4Highlight: "NEXT HOLIDAYS",
  vacancesBanner4After: "?",
  promptTitleA: "Interested? Take a look at one of my prompts for",
  promptTitleB: "written in early September 2026:",
  promptOpen: "Open the prompt",
  promptChars: "4,500-character prompt",
  promptDownload: "Download the .txt",
  promptLoading: "Loading...",
};

const dicts = { fr, en };

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "fr" || stored === "en") setLangState(stored);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const t = useCallback((key: keyof typeof fr) => dicts[lang][key], [lang]);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

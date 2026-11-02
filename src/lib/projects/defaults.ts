import monde_modesImg from '@/assets/monde-modes-v2.png.asset.json';
import monde_categoriesImg from '@/assets/monde-categories.png.asset.json';
import monde_triImg from '@/assets/monde-tri-v2.png.asset.json';
import vacances_eteImg from '@/assets/vacances-ete.png.asset.json';
import vacances_toussaintImg from '@/assets/vacances-toussaint.png.asset.json';
import vacances_fevrierImg from '@/assets/vacances-fevrier.png.asset.json';
import vacances_paquesImg from '@/assets/vacances-paques.png.asset.json';
import sourichat_img1 from '@/assets/souri-1.png.asset.json';
import sourichat_img2 from '@/assets/souri-2.png.asset.json';
import sourichat_img3 from '@/assets/souri-3.png.asset.json';
import sourichat_img4 from '@/assets/souri-4.png.asset.json';
import airports_img1 from '@/assets/air-1.png.asset.json';
import airports_img2 from '@/assets/air-2.png.asset.json';
import airports_img3 from '@/assets/air-3.png.asset.json';
import airports_img4 from '@/assets/air-4.png.asset.json';
import mondeLogo from '@/assets/monde.png.asset.json';
import vacancesLogo from '@/assets/vacances-logo.png.asset.json';
import sourichatLogo from '@/assets/sourichat.png.asset.json';
import airportsLogo from '@/assets/airports.png.asset.json';
import { fr } from '@/lib/i18n';
import type { ProjectData,ProjectSlide } from '@/lib/blog/schema';
const mondeFr = [
  {
    src: monde_modesImg.url,
    alt: "Accueil du Monde des Géographes avec les différents modes de jeu",
    before: "",
    highlight: "4",
    after: "DIFFÉRENTS MODES DE JEU SUR LE SITE",
  },
  {
    src: monde_categoriesImg.url,
    alt: "Liste des catégories de quiz du Monde des Géographes",
    before: "PLUSIEURS",
    highlight: "DIZAINES",
    after: "DE CATÉGORIES POUR S'AMUSER !",
  },
  {
    src: monde_triImg.url,
    alt: "Panneau de tri des catégories du Monde des Géographes",
    before: "UN",
    highlight: "SYSTÈME DE TRI INTELLIGENT",
    after: "POUR TROUVER VOS CATÉGORIES FAVORITES !",
  },
];
const mondeEn = [
  {
    src: monde_modesImg.url,
    alt: "Monde des Géographes home page with the different game modes",
    before: "",
    highlight: "4",
    after: "DIFFERENT GAME MODES ON THE SITE",
  },
  {
    src: monde_categoriesImg.url,
    alt: "List of quiz categories on Monde des Géographes",
    before: "SEVERAL",
    highlight: "DOZENS",
    after: "OF CATEGORIES TO HAVE FUN WITH !",
  },
  {
    src: monde_triImg.url,
    alt: "Category sorting panel on Monde des Géographes",
    before: "A",
    highlight: "SMART SORTING SYSTEM",
    after: "TO FIND YOUR FAVOURITE CATEGORIES !",
  },
];
const vacancesFr = [
  {
    src: vacances_eteImg.url,
    alt: "Compte à rebours avant les prochaines vacances d'été 2027",
    before: "REGARDEZ LA PROGRESSION AVANT LES",
    highlight: "VACANCES D'ÉTÉ PROCHAINES",
    after: "…",
  },
  {
    src: vacances_toussaintImg.url,
    alt: "Compte à rebours avant les prochaines vacances de la Toussaint",
    before: "… OU POUR",
    highlight: "LES PROCHAINES VACANCES À VENIR",
    after: "!",
  },
  {
    src: vacances_fevrierImg.url,
    alt: "Compte à rebours avant les prochaines vacances de février",
    before: "SUIVEZ AUSSI LES VACANCES DE",
    highlight: "FÉVRIER",
    after: "ET DE PÂQUES !",
  },
  {
    src: vacances_paquesImg.url,
    alt: "Compte à rebours avant les prochaines vacances de Pâques",
    before: "PRÊT POUR LES",
    highlight: "PROCHAINES VACANCES",
    after: "?",
  },
];
const vacancesEn = [
  {
    src: vacances_eteImg.url,
    alt: "Countdown to the next summer holidays 2027",
    before: "WATCH THE PROGRESS BEFORE THE",
    highlight: "NEXT SUMMER HOLIDAYS",
    after: "…",
  },
  {
    src: vacances_toussaintImg.url,
    alt: "Countdown to the next Toussaint holiday",
    before: "… OR FOR THE",
    highlight: "NEXT UPCOMING HOLIDAYS",
    after: "!",
  },
  {
    src: vacances_fevrierImg.url,
    alt: "Countdown to the next February holidays",
    before: "ALSO TRACK THE",
    highlight: "FEBRUARY",
    after: "AND EASTER HOLIDAYS!",
  },
  {
    src: vacances_paquesImg.url,
    alt: "Countdown to the next Easter holidays",
    before: "READY FOR THE",
    highlight: "NEXT HOLIDAYS",
    after: "?",
  },
];
const sourichatFr = [
  {
    src: sourichat_img1.url,
    alt: "Partie en cours vue par la souris sur Sourichat.map",
    parts: [
      { text: "FUYEZ EN TANT QUE" },
      { text: "SOURIS", hl: "souris" },
      { text: "POUR NE PAS VOUS FAIRE ATTRAPER" },
    ],
  },
  {
    src: sourichat_img2.url,
    alt: "Partie en cours vue par le chat sur Sourichat.map",
    parts: [
      { text: "ESSAYEZ D'ATTRAPER LA SOURIS EN TANT QUE" },
      { text: "CHAT", hl: "chat" },
      { text: "!" },
    ],
  },
  {
    src: sourichat_img3.url,
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
    src: sourichat_img4.url,
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
const sourichatEn = [
  {
    src: sourichat_img1.url,
    alt: "Ongoing game seen by the mouse on Sourichat.map",
    parts: [
      { text: "RUN AWAY AS THE" },
      { text: "MOUSE", hl: "souris" },
      { text: "SO YOU DON'T GET CAUGHT" },
    ],
  },
  {
    src: sourichat_img2.url,
    alt: "Ongoing game seen by the cat on Sourichat.map",
    parts: [
      { text: "TRY TO CATCH THE MOUSE AS THE" },
      { text: "CAT", hl: "chat" },
      { text: "!" },
    ],
  },
  {
    src: sourichat_img3.url,
    alt: "Game settings menu on Sourichat.map",
    parts: [
      { text: "SET UP A GAME" },
      { text: "EASILY", hl: "theme" },
      { text: "THANKS TO THIS" },
      { text: "ERGONOMIC AND EASY-TO-USE SETTINGS MENU", hl: "theme" },
      { text: "!" },
    ],
  },
  {
    src: sourichat_img4.url,
    alt: "Defining a play area with nodes on Sourichat.map",
    parts: [
      { text: "DEFINE A PLAY AREA" },
      { text: "EASILY", hl: "theme" },
      { text: "THANKS TO" },
      { text: "THE USE OF NODES", hl: "theme" },
      { text: "nodes", hl: "theme", small: true },
      { text: "!" },
    ],
  },
];
const airportsFr = [
  {
    src: airports_img1.url,
    alt: "Carte de France avec une ligne aérienne entre Lyon et Marseille",
    parts: [
      { text: "DÉVELOPPEZ VOTRE" },
      { text: "RÉSEAU AÉRIEN À TRAVERS LA FRANCE", hl: true },
      { text: "!" },
    ],
  },
  {
    src: airports_img2.url,
    alt: "Fiche de l'aéroport Marseille Provence avec son taux d'occupation",
    parts: [
      { text: "MÉFIEZ-VOUS QUE VOS" },
      { text: "AÉROPORTS NE SOIENT PAS REMPLIS", hl: true },
      { text: "!" },
    ],
  },
  {
    src: airports_img3.url,
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
    src: airports_img4.url,
    alt: "Vue complète du jeu Company Airports avec plusieurs lignes aériennes",
    parts: [
      { text: "CONTINUEZ DE" },
      { text: "DÉVELOPPER VOTRE RÉSEAU", hl: true },
      { text: "!" },
    ],
  },
];
const airportsEn = [
  {
    src: airports_img1.url,
    alt: "Map of France with an air route between Lyon and Marseille",
    parts: [
      { text: "GROW YOUR" },
      { text: "AIR NETWORK ACROSS FRANCE", hl: true },
      { text: "!" },
    ],
  },
  {
    src: airports_img2.url,
    alt: "Marseille Provence airport panel with its occupancy rate",
    parts: [
      { text: "WATCH OUT THAT YOUR" },
      { text: "AIRPORTS DON'T GET FULL", hl: true },
      { text: "!" },
    ],
  },
  {
    src: airports_img3.url,
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
    src: airports_img4.url,
    alt: "Full view of the Company Airports game with several air routes",
    parts: [
      { text: "KEEP" },
      { text: "GROWING YOUR NETWORK", hl: true },
      { text: "!" },
    ],
  },
];
type OriginalSlide={src:string;before?:string;highlight?:string;after?:string;parts?:{text:string}[]};
const caption=(s:OriginalSlide)=>s.parts?s.parts.map(p=>p.text).join(' '):[s.before,s.highlight,s.after].filter(Boolean).join(' ');
const make=(a:OriginalSlide[],b:OriginalSlide[],color:string):ProjectSlide[]=>a.map((s,i)=>({src:s.src,text:caption(s),text_en:b[i]?caption(b[i]):caption(s),color,font:'display'}));
const doc=(...texts:string[])=>({type:'doc',content:texts.map(text=>({type:'paragraph',content:[{type:'text',text}]}))});
export const builtinDefaults:Record<string,ProjectData>={
monde:{builtin_id:'monde',title:'Monde des Géographes',link:'https://mondedesgeographes.lovable.app/',logo:mondeLogo.url,images:[],slides:make(mondeFr,mondeEn,'#1675a9'),description:doc(fr.mondeD1,fr.mondeD2a+' '+fr.mondeD2b,fr.mondeD3),platforms:['pc','mobile'],langs:['fr','en'],button:'play',exe:true,publish_at:null,poster:'',maintenance:false,maintenance_image:'',maintenance_until:null,players_required:null},
vacances:{builtin_id:'vacances',title:'A Quand les Prochaines Vacances ?',link:'https://aquandlesprochainesvacances.lovable.app/',logo:vacancesLogo.url,images:[],slides:make(vacancesFr,vacancesEn,'#163754'),description:doc(fr.vacancesD1,fr.vacancesD2),platforms:['pc','mobile'],langs:['fr'],button:'access',exe:true,publish_at:null,poster:'',maintenance:false,maintenance_image:'',maintenance_until:null,players_required:null},
sourichat:{builtin_id:'sourichat',title:'Sourichat.map',link:'https://sourichatmap.lovable.app/',logo:sourichatLogo.url,images:[],slides:make(sourichatFr,sourichatEn,'#825b39'),description:doc(fr.souriD1a+' Fuze '+fr.souriD1b+' Aywen'+fr.souriD1c,fr.souriLi1,fr.souriLi2),platforms:['mobile'],langs:['fr','en'],button:'play',exe:true,publish_at:null,poster:'',maintenance:false,maintenance_image:'',maintenance_until:null,players_required:2},
airports:{builtin_id:'airports',title:'Company Airports',link:'https://companyairports.lovable.app/',logo:airportsLogo.url,images:[],slides:make(airportsFr,airportsEn,'#193251'),description:doc(fr.airD1),platforms:['pc'],langs:['fr'],button:'play',exe:true,publish_at:null,poster:'',maintenance:false,maintenance_image:'',maintenance_until:null,players_required:null},
};

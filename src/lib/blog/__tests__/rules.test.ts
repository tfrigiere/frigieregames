import { describe,it,expect } from 'vitest';
import { contentSchema,articleSchema,publicationTime,indentText,matchesArticle,projectState,projectSchema } from '../schema';
const doc=(text:string)=>({type:'doc',content:[{type:'paragraph',content:[{type:'text',text}]}]});
const article={title:'Article de test',banner:'',content:doc('Texte'),images:[],collaborators:[],projects:[],publish_at:'2027-02-12T12:00:00.000Z'};
describe('Limites demandées',()=>{
 it('limite le texte à 10 000 caractères',()=>{expect(contentSchema.safeParse(doc('x'.repeat(10000))).success).toBe(true);expect(contentSchema.safeParse(doc('x'.repeat(10001))).success).toBe(false);});
 it('limite les images annexes à 10',()=>{expect(articleSchema.safeParse({...article,images:Array(10).fill('https://example.org/photo.png')}).success).toBe(true);expect(articleSchema.safeParse({...article,images:Array(11).fill('https://example.org/photo.png')}).success).toBe(false);});
 it('limite les rôles éditoriaux aux deux rôles demandés',()=>{expect(articleSchema.safeParse({...article,collaborators:[{name:'Frige',avatar:'',label:'gerant'},{name:'Modération',avatar:'',label:'moderateur'}]}).success).toBe(true);expect(articleSchema.safeParse({...article,collaborators:[{name:'Intrus',avatar:'',label:'admin'}]}).success).toBe(false);});
});

describe("Publication",()=>{it("publie immédiatement malgré une horloge d’appareil en avance",()=>{expect(publicationTime(true,"2026-10-20T07:05:29.425Z","2026-10-19T07:01:44.697Z")).toBe("2026-10-19T07:01:44.697Z");});it("conserve la date choisie pour une publication programmée",()=>{expect(publicationTime(false,"2026-10-22T12:00:00.000Z","2026-10-19T07:01:44.697Z")).toBe("2026-10-22T12:00:00.000Z");});});
describe('Règles de novembre',()=>{
 it('Tab insère exactement quatre espaces',()=>{expect(indentText('abc',1,1)).toEqual({value:'a    bc',position:5});});
 it('autorise plusieurs jeux et filtre leur union',()=>{expect(matchesArticle({projects:['airports'],categories:['changelog']},['monde','airports'],'changelog')).toBe(true);expect(matchesArticle({projects:['sourichat'],categories:['changelog']},['monde','airports'],'changelog')).toBe(false);});
 it('ne retient que la catégorie choisie',()=>{expect(matchesArticle({projects:[],categories:['other']},[],'changelog')).toBe(false);expect(matchesArticle({projects:[],categories:['changelog','other']},[],'changelog')).toBe(true);});
 it('autorise les nouveaux projets comme étiquettes',()=>{expect(articleSchema.safeParse({...article,projects:['6d8b8478-fef1-4bdf-97f0-a64c734227c4']}).success).toBe(true);});
 it('la bannière est une photo par défaut',()=>{expect(articleSchema.parse(article).banner_type).toBe('photo');});
 it('verrouille le projet avant la date serveur et ouvre à la date exacte',()=>{const p={publish_at:'2026-11-05T12:00:00Z'};expect(projectState(p,'2026-11-05T11:59:59Z')).toBe('scheduled');expect(projectState(p,'2026-11-05T12:00:00Z')).toBe('live');});
 it('la maintenance reste prioritaire jusqu’à sa désactivation',()=>{expect(projectState({maintenance:true,maintenance_until:'2026-11-01T00:00:00Z'},'2026-11-05T12:00:00Z')).toBe('maintenance');});
 it('requiert une affiche pour une publication programmée',()=>{const p={title:'Test',link:'https://example.org',description:doc('Test'),platforms:[],langs:[],button:'play',exe:false,publish_at:'2026-11-05T12:00:00Z'};expect(projectSchema.safeParse(p).success).toBe(false);expect(projectSchema.safeParse({...p,poster:'https://example.org/poster.png'}).success).toBe(true);});
});

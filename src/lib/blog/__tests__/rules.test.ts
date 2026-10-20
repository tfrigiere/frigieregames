import { describe,it,expect } from 'vitest';
import { contentSchema,articleSchema,publicationTime } from '../schema';
const doc=(text:string)=>({type:'doc',content:[{type:'paragraph',content:[{type:'text',text}]}]});
const article={title:'Article de test',banner:'',content:doc('Texte'),images:[],collaborators:[],projects:[],publish_at:'2027-02-12T12:00:00.000Z'};
describe('Limites demandées',()=>{
 it('limite le texte à 10 000 caractères',()=>{expect(contentSchema.safeParse(doc('x'.repeat(10000))).success).toBe(true);expect(contentSchema.safeParse(doc('x'.repeat(10001))).success).toBe(false);});
 it('limite les images annexes à 10',()=>{expect(articleSchema.safeParse({...article,images:Array(10).fill('https://example.org/photo.png')}).success).toBe(true);expect(articleSchema.safeParse({...article,images:Array(11).fill('https://example.org/photo.png')}).success).toBe(false);});
 it('limite les rôles éditoriaux aux deux rôles demandés',()=>{expect(articleSchema.safeParse({...article,collaborators:[{name:'Frige',avatar:'',label:'gerant'},{name:'Modération',avatar:'',label:'moderateur'}]}).success).toBe(true);expect(articleSchema.safeParse({...article,collaborators:[{name:'Intrus',avatar:'',label:'admin'}]}).success).toBe(false);});
});

describe("Publication",()=>{it("publie immédiatement malgré une horloge d’appareil en avance",()=>{expect(publicationTime(true,"2026-10-20T07:05:29.425Z","2026-10-19T07:01:44.697Z")).toBe("2026-10-19T07:01:44.697Z");});it("conserve la date choisie pour une publication programmée",()=>{expect(publicationTime(false,"2026-10-22T12:00:00.000Z","2026-10-19T07:01:44.697Z")).toBe("2026-10-22T12:00:00.000Z");});});

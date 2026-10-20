import { z } from 'zod';
export const projectNames: Record<string,string> = {monde:'Monde des Géographes',vacances:'A Quand les Prochaines Vacances ?',sourichat:'Sourichat.map',airports:'Company Airports'};
export const projectId = z.enum(['monde','vacances','sourichat','airports']);
export const colorSchema = z.string().regex(/^#[0-9a-fA-F]{6}$/);
const media = z.string().max(2048).refine(v => v === '' || v.startsWith('blog-media/') || /^https:\/\//.test(v) || v.startsWith('/__l5e/assets-v1/'));
export type TextNode = {type:string;text?:string|undefined;attrs?:Record<string,string|number|undefined>|undefined;marks?:{type:string;attrs?:Record<string,string|undefined>|undefined}[]|undefined;content?:TextNode[]|undefined};
export function textLength(n: TextNode):number { return (n.text?.length || 0) + (n.content || []).reduce((a,c)=>a+textLength(c),0); }
const node: z.ZodType<TextNode> = z.lazy(()=>z.object({type:z.enum(['doc','paragraph','text','heading','bulletList','orderedList','listItem','hardBreak','blockquote','horizontalRule']),text:z.string().optional(),attrs:z.object({textAlign:z.enum(['left','center','right','justify']).optional(),level:z.number().min(1).max(6).optional()}).optional(),marks:z.array(z.object({type:z.enum(['bold','italic','strike','underline','textStyle','highlight']),attrs:z.object({color:colorSchema.optional(),backgroundColor:colorSchema.optional(),fontSize:z.string().regex(/^(12|14|16|18|20|24|28|32)px$/).optional()}).optional()})).optional(),content:z.array(node).optional()}));
export const contentSchema = z.preprocess(value=>JSON.parse(JSON.stringify(value,(_key,v)=>v===null?undefined:v)),node).refine(n=>textLength(n)<=10000,'10 000 caractères maximum');
export const collaboratorSchema = z.object({id:z.string().uuid().optional(),name:z.string().trim().min(1).max(80),avatar:media,label:z.enum(['gerant','moderateur'])});
export const articleSchema = z.object({id:z.string().uuid().optional(),title:z.string().trim().min(1).max(200),banner:media,content:contentSchema,images:z.array(media).max(10),collaborators:z.array(collaboratorSchema).max(30),projects:z.array(projectId).max(4),publish_at:z.string().datetime(),publish_now:z.boolean().optional()});
export function publicationTime(immediate:boolean|undefined,requested:string,databaseNow:string):string {return immediate?databaseNow:requested;}
export type Article = z.infer<typeof articleSchema> & {id:string;created_at?:string};
export type Collaborator = z.infer<typeof collaboratorSchema> & {id:string};
export type Tag = {project_id:string;color_start:string;color_end:string;gradient:boolean};
export const tagSchema = z.object({project_id:projectId,color_start:colorSchema,color_end:colorSchema,gradient:z.boolean()});

import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { articleSchema, collaboratorSchema, tagSchema } from './schema';
export const adminStatus=createServerFn({method:'GET'}).handler(async()=>{const {gateSession}=await import('./gate.server');return {admin:!!(await gateSession()).data.admin};});
export const unlockAdmin=createServerFn({method:'POST'}).inputValidator(z.object({password:z.string().min(1).max(256)})).handler(async({data})=>{
 const {gateSession}=await import('./gate.server'); const {createHash,timingSafeEqual}=await import('node:crypto'); const {getRequestIP}=await import('@tanstack/react-start/server');
 const {supabaseAdmin}=await import('@/integrations/supabase/client.server');
 const key=createHash('sha256').update(getRequestIP({xForwardedFor:true})||'unknown').digest('hex');
 const {data:allowed,error}=await supabaseAdmin.rpc('consume_admin_attempt',{_key:key}); if(error||!allowed)return {ok:false};
 const expected=process.env['SITE_PASSWORD']; if(!expected)return {ok:false};
 if(!timingSafeEqual(createHash('sha256').update(data.password).digest(),createHash('sha256').update(expected).digest()))return {ok:false};
 await (await gateSession()).update({admin:true});return {ok:true};
});
export const lockAdmin=createServerFn({method:'POST'}).handler(async()=>{const {gateSession}=await import('./gate.server');await(await gateSession()).clear();return {ok:true};});
export const listBlog=createServerFn({method:'GET'}).handler(async()=>{
 const {createClient}=await import('@supabase/supabase-js');const {gateSession}=await import('./gate.server');const admin=!!(await gateSession()).data.admin;
 let client;
 if(admin){const {supabaseAdmin}=await import('@/integrations/supabase/client.server');client=supabaseAdmin;}else{
 const url=process.env['SUPABASE_URL'];const key=process.env['SUPABASE_PUBLISHABLE_KEY']||process.env['SUPABASE_ANON_KEY'];if(!url||!key)throw new Error('Blog indisponible');
 client=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false},global:{fetch:(input,init)=>{const h=new Headers(init?.headers);if(key.startsWith('sb_'))h.delete('Authorization');h.set('apikey',key);return fetch(input,{...init,headers:h});}}});
 }
 const [articles,collaborators,tags]=await Promise.all([client.from('blog_articles').select('*').order('publish_at',{ascending:false}),client.from('blog_collaborators').select('*').order('name'),client.from('blog_project_tags').select('*')]);
 if(articles.error||collaborators.error||tags.error)throw new Error('Blog indisponible');return {articles:articles.data||[],collaborators:collaborators.data||[],tags:tags.data||[],admin};
});
export const saveArticle=createServerFn({method:'POST'}).inputValidator(articleSchema).handler(async({data})=>{const {requireAdmin}=await import('./gate.server');await requireAdmin();const {supabaseAdmin}=await import('@/integrations/supabase/client.server');const {data:row,error}=await supabaseAdmin.from('blog_articles').upsert(data).select('id').single();if(error)throw new Error('Enregistrement impossible');return row;});
export const deleteArticle=createServerFn({method:'POST'}).inputValidator(z.object({id:z.string().uuid()})).handler(async({data})=>{const {requireAdmin}=await import('./gate.server');await requireAdmin();const {supabaseAdmin}=await import('@/integrations/supabase/client.server');const {error}=await supabaseAdmin.from('blog_articles').delete().eq('id',data.id);if(error)throw new Error('Suppression impossible');return {ok:true};});
export const deleteComment=createServerFn({method:'POST'}).inputValidator(z.object({id:z.string().uuid()})).handler(async({data})=>{const {requireAdmin}=await import('./gate.server');await requireAdmin();const {supabaseAdmin}=await import('@/integrations/supabase/client.server');const {error}=await supabaseAdmin.from('project_comments').delete().eq('id',data.id);if(error)throw new Error('Suppression impossible');return {ok:true};});
export const saveCollaborator=createServerFn({method:'POST'}).inputValidator(collaboratorSchema).handler(async({data})=>{const {requireAdmin}=await import('./gate.server');await requireAdmin();const {supabaseAdmin}=await import('@/integrations/supabase/client.server');const {error}=await supabaseAdmin.from('blog_collaborators').upsert(data);if(error)throw new Error('Enregistrement impossible');return {ok:true};});
export const saveTag=createServerFn({method:'POST'}).inputValidator(tagSchema).handler(async({data})=>{const {requireAdmin}=await import('./gate.server');await requireAdmin();const {supabaseAdmin}=await import('@/integrations/supabase/client.server');const {error}=await supabaseAdmin.from('blog_project_tags').upsert(data);if(error)throw new Error('Enregistrement impossible');return {ok:true};});
export const uploadBlogImage=createServerFn({method:'POST'}).inputValidator((data:FormData)=>{if(!(data instanceof FormData))throw new Error('Image requise');return data;}).handler(async({data})=>{
 const {requireAdmin}=await import('./gate.server');await requireAdmin();const file=data.get('file');
 if(!(file instanceof File)||!['image/jpeg','image/png','image/webp','image/gif','image/avif','image/bmp'].includes(file.type)||file.size>10*1024*1024)throw new Error('Image non prise en charge (10 Mo maximum)');
 const bytes=new Uint8Array(await file.arrayBuffer());const valid=(bytes[0]===255&&bytes[1]===216)||(bytes[0]===137&&bytes[1]===80)||(bytes[0]===71&&bytes[1]===73)||(bytes[0]===82&&bytes[1]===73)||(bytes[0]===66&&bytes[1]===77)||(bytes[4]===102&&bytes[5]===116);if(!valid)throw new Error('Format image invalide');
 const {supabaseAdmin}=await import('@/integrations/supabase/client.server');const path=crypto.randomUUID()+'.'+file.type.split('/')[1];const {error}=await supabaseAdmin.storage.from('blog-media').upload(path,bytes,{contentType:file.type});if(error)throw new Error('Import impossible');
 const base=import.meta.env.VITE_SUPABASE_URL;return {url:base+'/storage/v1/object/public/blog-media/'+path};
});

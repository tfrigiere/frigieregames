import { useState, lazy, Suspense } from 'react';
import { ClientOnly } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { Plus, ImagePlus, X, Trash2, Play, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { listProjects, saveProject, deleteProject, uploadBlogImage } from '@/lib/blog/blog.functions';
import { TextContent } from '@/components/blog/ArticleView';
import { ProjectConditions } from '@/components/ProjectConditions';
import { FlagFR, FlagEN } from '@/components/Flags';
import { useAdmin } from '@/components/AdminAccess';
import { useLang } from '@/lib/i18n';
import type { TextNode } from '@/lib/blog/schema';
const RichText=lazy(()=>import('@/components/blog/RichText').then(m=>({default:m.RichText})));

export function CustomProjects(){
 const {lang}=useLang();const tr=(f:string,e:string)=>lang==='fr'?f:e;const {admin}=useAdmin();
 const q=useQuery({queryKey:['projects'],queryFn:()=>listProjects()});const del=useServerFn(deleteProject);
 const [open,setOpen]=useState<string|null>(null),[editing,setEditing]=useState(false);
 const plat=(p:string[])=>p.map(x=>x==='pc'?'PC':tr('Téléphone','Phone')).join(' / ')||'—';
 return <>
  {(q.data||[]).map(p=>{const isOpen=open===p.id;return <article key={p.id} className="overflow-hidden rounded-2xl border border-border bg-card/70 shadow-elevated backdrop-blur">
   <button type="button" onClick={()=>setOpen(isOpen?null:p.id)} aria-expanded={isOpen} className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-accent/10">
    {p.image_urls[0]&&<img src={p.image_urls[0]} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover"/>}
    <span className="flex-1 text-lg font-bold text-card-foreground sm:text-xl">{p.title}</span>
    <span className={`text-accent transition-transform ${isOpen?'rotate-180':''}`} aria-hidden>▼</span></button>
   {isOpen&&<div className="space-y-4 border-t border-border px-5 py-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
    {!!p.image_urls.length&&<div className="article-images">{p.image_urls.map((u,i)=><a key={i} href={u} target="_blank" rel="noreferrer"><img src={u} alt={`${p.title} ${i+1}`}/></a>)}</div>}
    <div className="article-text"><TextContent node={p.description as TextNode}/></div>
    <ProjectConditions platforms={plat(p.platforms)} langs={p.langs as ('fr'|'en')[]}/>
    <a href={p.link} target="_blank" rel="noopener noreferrer" className={p.button==='access'?'btn-access':'btn-play'}>{p.button==='access'?<ExternalLink/>:<Play/>}{p.button==='access'?tr('ACCÉDER','ACCESS'):'PLAY'}</a>
    {admin&&<Button variant="ghost" onClick={async()=>{if(confirm(tr('Supprimer ce projet ?','Delete this project?'))){await del({data:{id:p.id}});void q.refetch();}}}><Trash2 className="text-destructive"/>{tr('Supprimer','Delete')}</Button>}
   </div>}</article>;})}
  {admin&&<Button className="bg-play text-play-foreground w-full" onClick={()=>setEditing(true)}><Plus/>{tr('Ajouter un projet','Add a project')}</Button>}
  {admin&&editing&&<ProjectEditor onClose={()=>setEditing(false)} onSaved={()=>q.refetch()}/>}
 </>;
}

function ProjectEditor({onClose,onSaved}:{onClose:()=>void;onSaved:()=>unknown}){
 const {lang}=useLang();const tr=(f:string,e:string)=>lang==='fr'?f:e;
 const save=useServerFn(saveProject),upload=useServerFn(uploadBlogImage);
 const [title,setTitle]=useState(''),[link,setLink]=useState('https://'),[images,setImages]=useState<{url:string;preview:string}[]>([]),[desc,setDesc]=useState<TextNode>({type:'doc',content:[{type:'paragraph'}]}),[platforms,setPlatforms]=useState<('pc'|'mobile')[]>([]),[langs,setLangs]=useState<('fr'|'en')[]>([]),[button,setButton]=useState<'play'|'access'>('play'),[exe,setExe]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState('');
 const toggle=<T,>(arr:T[],v:T,set:(a:T[])=>void)=>set(arr.includes(v)?arr.filter(x=>x!==v):[...arr,v]);
 async function add(files:FileList|null){if(!files)return;setBusy(true);setError('');try{for(const f of Array.from(files).slice(0,10-images.length)){const fd=new FormData();fd.set('file',f);const r=await upload({data:fd});setImages(o=>[...o,{url:r.url,preview:r.preview}]);}}catch{setError(tr('Image non prise en charge (10 Mo max).','Unsupported image (10 MB max).'));}finally{setBusy(false);}}
 return <Dialog open onOpenChange={v=>{if(!v)onClose();}}><DialogContent className="blog-editor-modal" aria-describedby={undefined}><DialogTitle className="font-display text-xl">{title||tr('NOUVEAU PROJET','NEW PROJECT')}</DialogTitle>
 <form className="space-y-7" onSubmit={async e=>{e.preventDefault();setBusy(true);setError('');try{await save({data:{title,link,images:images.map(i=>i.url),description:desc,platforms,langs,button,exe}});await onSaved();onClose();}catch{setError(tr('Vérifiez le titre et le lien (https://…).','Check the title and link (https://…).'));}finally{setBusy(false);}}}>
  <fieldset className="editor-section"><legend>01 — {tr('ENTÊTE DU PROJET','PROJECT HEADER')}</legend><label className="blog-label" htmlFor="pt">{tr('Titre du projet','Project title')}</label><input id="pt" className="blog-input" required maxLength={120} value={title} onChange={e=>setTitle(e.target.value)}/><label className="blog-label mt-4" htmlFor="pl">{tr('Lien du site','Site link')}</label><input id="pl" type="url" className="blog-input" required value={link} onChange={e=>setLink(e.target.value)}/></fieldset>
  <fieldset className="editor-section"><legend>02 — {tr('PRÉSENTATION DIRECTE','PRESENTATION')}</legend><span className="blog-label">{tr('Images du site (la 1ère sert de logo)','Site images (first one is the logo)')}</span><div className="upload-grid">{images.map((im,i)=><div key={i} className="relative"><div className="image-upload"><img src={im.preview} alt={`${i+1}`}/></div><Button type="button" size="icon" variant="destructive" className="absolute right-1 top-1" onClick={()=>setImages(images.filter((_,n)=>n!==i))}><X/></Button></div>)}{images.length<10&&<label className="image-upload"><ImagePlus/><input type="file" accept="image/*" multiple disabled={busy} onChange={e=>void add(e.target.files)}/></label>}</div>
   <span className="blog-label mt-5">{tr('Description','Description')}</span><ClientOnly><Suspense fallback={<div className="h-60 bg-secondary"/>}><RichText value={desc} onChange={setDesc}/></Suspense></ClientOnly></fieldset>
  <fieldset className="editor-section"><legend>03 — {tr('ACCÈS ET CONDITIONS','ACCESS & CONDITIONS')}</legend><span className="blog-label">{tr('Plateformes supportées','Supported platforms')}</span><div className="flex gap-5"><label className="flex gap-2 items-center"><input type="checkbox" checked={platforms.includes('mobile')} onChange={()=>toggle(platforms,'mobile',setPlatforms)}/>{tr('Téléphone','Phone')}</label><label className="flex gap-2 items-center"><input type="checkbox" checked={platforms.includes('pc')} onChange={()=>toggle(platforms,'pc',setPlatforms)}/>PC</label></div>
   <span className="blog-label mt-4">{tr('Langues','Languages')}</span><div className="flex gap-5"><label className="flex gap-2 items-center"><input type="checkbox" checked={langs.includes('fr')} onChange={()=>toggle(langs,'fr',setLangs)}/><FlagFR/></label><label className="flex gap-2 items-center"><input type="checkbox" checked={langs.includes('en')} onChange={()=>toggle(langs,'en',setLangs)}/><FlagEN/></label></div>
   <span className="blog-label mt-4">{tr('Bouton','Button')}</span><div className="flex gap-5"><label className="flex gap-2 items-center"><input type="radio" name="btn" checked={button==='play'} onChange={()=>setButton('play')}/>PLAY : {tr('Jeu','Game')}</label><label className="flex gap-2 items-center"><input type="radio" name="btn" checked={button==='access'} onChange={()=>setButton('access')}/>{tr('ACCÉDER : Utilité publique','ACCESS: Public utility')}</label></div></fieldset>
  <fieldset className="editor-section"><legend>04 — {tr('PARTIE EXÉCUTABLE','EXECUTABLE')}</legend><span className="blog-label">{tr('Disponible sur la version .exe ?','Available in the .exe version?')}</span><div className="flex gap-5"><label className="flex gap-2 items-center"><input type="radio" name="exe" checked={exe} onChange={()=>setExe(true)}/>{tr('Oui','Yes')}</label><label className="flex gap-2 items-center"><input type="radio" name="exe" checked={!exe} onChange={()=>setExe(false)}/>{tr('Non','No')}</label></div></fieldset>
  {error&&<p role="alert" className="text-destructive">{error}</p>}<div className="flex justify-end gap-3"><Button type="button" variant="outline" onClick={onClose}>{tr('Annuler','Cancel')}</Button><Button type="submit" disabled={busy} className="bg-play text-play-foreground">{busy?'…':tr('Publier le projet','Publish project')}</Button></div>
 </form></DialogContent></Dialog>;
}

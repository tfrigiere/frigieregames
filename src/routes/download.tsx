import { createFileRoute } from '@tanstack/react-router';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { useState } from 'react';
import { getLauncher, saveLauncher } from '@/lib/blog/blog.functions';
import { useAdmin } from '@/components/AdminAccess';
import { useLang } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import icon from '@/assets/frigiere-icon.png.asset.json';
const opts=queryOptions({queryKey:['launcher'],queryFn:()=>getLauncher()});
export const Route=createFileRoute('/download')({head:()=>({meta:[{title:'Download Launcher — Frigiere.games'},{name:'description',content:'Téléchargez le FRIGIEREGAMES LAUNCHER pour Windows et installez vos jeux.'},{property:'og:title',content:'FRIGIEREGAMES LAUNCHER pour Windows'},{property:'og:description',content:'Le launcher officiel de Frigiere.games pour Windows.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),loader:({context})=>context.queryClient.ensureQueryData(opts),component:Page});
function Windows(){return <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden fill="currentColor"><path d="M0 3.4 9.8 2v9.5H0zM11 1.8 24 0v11.4H11zM0 12.6h9.8V22L0 20.6zM11 12.6h13V24l-13-1.8z"/></svg>;}
function Page(){const {lang}=useLang();const tr=(f:string,e:string)=>lang==='fr'?f:e;const {admin}=useAdmin();const q=useQuery(opts);const save=useServerFn(saveLauncher);
 const [confirm,setConfirm]=useState(false),[edit,setEdit]=useState(false),[v,setV]=useState(''),[u,setU]=useState(''),[msg,setMsg]=useState('');const d=q.data||{version:'1.0',url:''};
 return <section className="mx-auto max-w-3xl px-6 pb-24 text-center"><div className="launcher-card"><img src={icon.url} alt="Frigiere.games" className="mx-auto h-36 w-36 object-contain"/><h1 className="text-title-3d text-3xl font-black sm:text-4xl">FRIGIEREGAMES LAUNCHER</h1><p className="text-accent font-bold tracking-[0.2em]">VERSION {d.version}</p>
  <p className="text-muted-foreground mt-4">{tr('Installez vos jeux Frigiere.games directement sur votre PC.','Install your Frigiere.games titles directly on your PC.')}</p>
  <button type="button" className="btn-windows" onClick={()=>setConfirm(true)}><Windows/>DOWNLOAD FOR WINDOWS</button>
  {admin&&<div className="mt-6"><Button variant="outline" onClick={()=>{setV(d.version);setU(d.url);setEdit(true);}}>{tr('Modifier la version / le fichier','Edit version / file')}</Button></div>}</div>
  <Dialog open={confirm} onOpenChange={setConfirm}><DialogContent aria-describedby={undefined}><DialogTitle className="font-display text-xl">{tr('UN .EXE VA SE TÉLÉCHARGER','AN .EXE WILL BE DOWNLOADED')}</DialogTitle>{!d.url&&<p className="text-muted-foreground">{tr('Le fichier du launcher arrive bientôt.','The launcher file is coming soon.')}</p>}<div className="flex justify-end gap-3"><Button variant="outline" onClick={()=>setConfirm(false)}>{tr('Annuler','Cancel')}</Button><Button className="bg-play text-play-foreground" disabled={!d.url} onClick={()=>{window.location.href=d.url;setConfirm(false);}}>{tr('Télécharger','Download')}</Button></div></DialogContent></Dialog>
  <Dialog open={edit} onOpenChange={setEdit}><DialogContent aria-describedby={undefined}><DialogTitle>{tr('Launcher','Launcher')}</DialogTitle><label className="blog-label" htmlFor="lv">Version</label><input id="lv" className="blog-input" value={v} onChange={e=>setV(e.target.value)}/><label className="blog-label" htmlFor="lu">{tr('Lien du fichier .exe (https://…)','.exe file link (https://…)')}</label><input id="lu" className="blog-input" value={u} onChange={e=>setU(e.target.value)}/>{msg&&<p className="text-destructive">{msg}</p>}<div className="flex justify-end gap-3"><Button variant="outline" onClick={()=>setEdit(false)}>{tr('Annuler','Cancel')}</Button><Button onClick={async()=>{try{await save({data:{version:v,url:u}});await q.refetch();setEdit(false);setMsg('');}catch{setMsg(tr('Vérifiez la version et le lien.','Check version and link.'));}}}>{tr('Enregistrer','Save')}</Button></div></DialogContent></Dialog>
 </section>;}

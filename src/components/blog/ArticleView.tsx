import type { Article, TextNode, Tag } from '@/lib/blog/schema';
import { projectNames } from '@/lib/blog/schema';
import hammer from '@/assets/marteau-admin.jpeg.asset.json';
import shield from '@/assets/moderateur.jpeg.asset.json';
import { useLang } from '@/lib/i18n';
import { Fragment, useState, useRef, type ReactNode, type CSSProperties } from 'react';
import { ImageViewer } from '@/components/ImageViewer';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
export type DisplayArticle=Omit<Article,'collaborators'> & {banner_url?:string;image_urls?:string[];collaborators:(Article['collaborators'][number]&{avatar_url?:string})[]};
export const defaultTag:Tag={project_id:'',color_start:'#1675a9',color_end:'#38a8d8',gradient:false};
export function ProjectTag({id,tags,names=projectNames}:{id:string;tags:Tag[];names?:Record<string,string>}){const t=tags.find(t=>t.project_id===id)||defaultTag;return <span className="article-tag" style={{'--tag-start':t.color_start,'--tag-end':t.gradient?t.color_end:t.color_start} as CSSProperties}>{names[id]||id}</span>;}
export function TextContent({node}:{node:TextNode}):ReactNode{
 const children=node.content?.map((n,i)=><TextContent key={i} node={n}/>);
 if(node.type==='text'){let text:ReactNode=node.text;for(const m of node.marks||[]){if(m.type==='bold')text=<strong>{text}</strong>;if(m.type==='italic')text=<em>{text}</em>;if(m.type==='strike')text=<s>{text}</s>;if(m.type==='underline')text=<u>{text}</u>;if(m.type==='textStyle')text=<span style={{color:m.attrs?.['color'] as string,fontSize:m.attrs?.['fontSize'] as string}}>{text}</span>;if(m.type==='highlight')text=<mark style={{backgroundColor:m.attrs?.['color'] as string}}>{text}</mark>;}return text;}
 const style={textAlign:node.attrs?.['textAlign'] as CSSProperties['textAlign']};
 if(node.type==='paragraph')return <p style={style}>{children||<br/>}</p>;
 if(node.type==='heading')return <h3 style={style}>{children}</h3>;
 if(node.type==='bulletList')return <ul>{children}</ul>;if(node.type==='orderedList')return <ol>{children}</ol>;if(node.type==='listItem')return <li>{children}</li>;if(node.type==='blockquote')return <blockquote>{children}</blockquote>;if(node.type==='hardBreak')return <br/>;if(node.type==='horizontalRule')return <hr/>;return <Fragment>{children}</Fragment>;
}
function VideoBanner({src}:{src:string}){const video=useRef<HTMLVideoElement>(null);const [started,setStarted]=useState(false);const {lang}=useLang();return <div className="article-video"><video ref={video} src={src} controls playsInline preload="metadata" onPlay={()=>setStarted(true)} onEnded={()=>setStarted(false)}/>{!started&&<Button className="article-video-play" size="icon" aria-label={lang==='fr'?'Lire la vidéo':'Play video'} onClick={()=>void video.current?.play()}><Play/></Button>}</div>;}
export function ArticleView({article:a,tags,names=projectNames}:{article:DisplayArticle;tags:Tag[];names?:Record<string,string>}){
 const {lang}=useLang();const [zoom,setZoom]=useState<number|null>(null);const photoBanner=a.banner_type!=='video'&&a.banner_url;const photos=[...(photoBanner?[photoBanner]:[]),...(a.image_urls||[])];
 return <><h2 className="article-title">{a.title}</h2>{a.banner_url&&(a.banner_type==='video'?<VideoBanner src={a.banner_url}/>:<Button variant="ghost" className="article-photo" aria-label={lang==='fr'?'Agrandir la bannière':'Enlarge banner'} onClick={()=>setZoom(0)}><img src={a.banner_url} alt={a.title} className="article-banner"/></Button>)}<div className="article-body"><time dateTime={a.publish_at} className="text-muted-foreground text-sm">{new Date(a.publish_at).toLocaleString(lang==='fr'?'fr-FR':'en-GB',{day:'numeric',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit'})}</time><div className="article-byline"><div className="flex flex-wrap gap-4">{a.collaborators.map((c,i)=><div key={c.id||i} className="flex items-center gap-2">{c.avatar_url&&<img src={c.avatar_url} alt={c.name} className="h-10 w-10 rounded-full object-cover"/>}<span className="font-semibold">{c.name}</span><img src={c.label==='gerant'?hammer.url:shield.url} alt={c.label==='gerant'?(lang==='fr'?'Gérant':'Manager'):(lang==='fr'?'Modérateur':'Moderator')} className="role-icon"/></div>)}</div><div className="flex flex-wrap gap-2">{a.projects.map(id=><ProjectTag key={id} id={id} tags={tags} names={names}/>)}</div></div><hr className="article-separator"/><div className="article-text"><TextContent node={a.content}/></div>{!!a.image_urls?.length&&<div className="article-images">{a.image_urls.map((url,i)=><Button key={i} variant="ghost" className="article-photo" aria-label={`${lang==='fr'?'Agrandir l’image':'Enlarge image'} ${i+1}`} onClick={()=>setZoom(i+(photoBanner?1:0))}><img src={url} alt={`${a.title} — ${i+1}`}/></Button>)}</div>}</div>{zoom!==null&&<ImageViewer images={photos} index={zoom} onClose={()=>setZoom(null)}/>}</>;
}

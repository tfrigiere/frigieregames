import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useLang } from '@/lib/i18n';
import { BookOpen, Boxes, Download } from 'lucide-react';
export function ProjectTabs(){const {t}=useLang();const [app,setApp]=useState(false);useEffect(()=>setApp(navigator.userAgent.includes('FrigiereLauncher')),[]);return <nav className="project-tabs" aria-label="Frigiere.games"><Link to="/" activeOptions={{exact:true}} activeProps={{className:'selected'}}><Boxes size={18}/>{t('projectsTitle')}</Link><Link to="/blog" activeProps={{className:'selected'}}><BookOpen size={18}/>BLOG</Link>{!app&&<Link to="/download" activeProps={{className:'selected'}}><Download size={18}/>DOWNLOAD LAUNCHER</Link>}</nav>;}

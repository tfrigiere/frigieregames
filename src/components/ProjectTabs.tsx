import { Link } from '@tanstack/react-router';
import { useLang } from '@/lib/i18n';
import { BookOpen, Boxes } from 'lucide-react';
export function ProjectTabs(){const {t}=useLang();return <nav className="project-tabs" aria-label="Frigiere.games"><Link to="/" activeOptions={{exact:true}} activeProps={{className:'selected'}}><Boxes size={18}/>{t('projectsTitle')}</Link><Link to="/blog" activeProps={{className:'selected'}}><BookOpen size={18}/>BLOG</Link></nav>;}
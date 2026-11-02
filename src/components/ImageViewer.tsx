import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLang } from '@/lib/i18n';
export function ImageViewer({images,index,onClose}:{images:string[];index:number;onClose:()=>void}){
 const {t}=useLang();const [current,setCurrent]=useState(index);const src=images[current];
 return <Dialog open onOpenChange={v=>{if(!v)onClose();}}><DialogContent className="image-viewer" aria-describedby={undefined} onKeyDown={e=>{if(e.key==='ArrowLeft')setCurrent(i=>(i-1+images.length)%images.length);if(e.key==='ArrowRight')setCurrent(i=>(i+1)%images.length);}}><DialogTitle className="sr-only">{t('goToImage')}</DialogTitle>{src&&<img src={src} alt={`${current+1} / ${images.length}`}/>}<div className="flex items-center justify-center gap-6"><Button variant="outline" size="icon" aria-label={t('prevImage')} disabled={images.length<2} onClick={()=>setCurrent(i=>(i-1+images.length)%images.length)}><ChevronLeft/></Button><span>{current+1} / {images.length}</span><Button variant="outline" size="icon" aria-label={t('nextImage')} disabled={images.length<2} onClick={()=>setCurrent(i=>(i+1)%images.length)}><ChevronRight/></Button></div></DialogContent></Dialog>;
}
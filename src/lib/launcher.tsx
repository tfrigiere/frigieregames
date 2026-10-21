import { useEffect, useState } from 'react';
import studio from '@/assets/frigiere-studio.png.asset.json';

type Bridge = {
  installed: () => Promise<Record<string, { url: string; size: number }>>;
  size: (url: string) => Promise<number>;
  install: (o: { id: string; name: string; url: string; shortcut: boolean }) => Promise<{ size: number }>;
  play: (url: string) => Promise<void>;
  onProgress: (cb: (p: { id: string; got: number; total: number }) => void) => () => void;
};
export const bridge = () => (typeof window !== 'undefined' ? ((window as unknown as { frigiere?: Bridge }).frigiere ?? null) : null);
export function useIsLauncher() {
  const [v, setV] = useState(false);
  useEffect(() => setV(navigator.userAgent.includes('FrigiereLauncher')), []);
  return v;
}
export const fmtSize = (b: number) => (b >= 1 << 30 ? (b / (1 << 30)).toFixed(2) + ' Go' : b >= 1 << 20 ? (b / (1 << 20)).toFixed(1) + ' Mo' : Math.max(1, Math.round(b / 1024)) + ' Ko');

/** Cinématique « GAME/PRODUCT POWERED BY » puis ouverture. */
export function PoweredBy({ product, onDone }: { product: boolean; onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 3800); return () => clearTimeout(t); }, [onDone]);
  return (
    <div className="powered-intro" onClick={onDone}>
      <p className="powered-line">{product ? 'PRODUCT' : 'GAME'}</p>
      <p className="powered-line powered-by">POWERED BY :</p>
      <img src={studio.url} alt="Frigiere Studio" className="powered-logo" />
    </div>
  );
}

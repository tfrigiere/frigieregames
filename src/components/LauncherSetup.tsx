import { useEffect, useState } from 'react';
import { bridge, useIsLauncher } from '@/lib/launcher';

const GAMES = [
  { id: 'monde', name: 'Monde des Géographes', url: 'https://mondedesgeographes.lovable.app/' },
  { id: 'vacances', name: 'A Quand les Prochaines Vacances ?', url: 'https://aquandlesprochainesvacances.lovable.app/' },
  { id: 'sourichat', name: 'Sourichat.map', url: 'https://sourichatmap.lovable.app/' },
  { id: 'airports', name: 'Company Airports', url: 'https://companyairports.lovable.app/' },
];
const DONE = 'frigiere_launcher_setup';

/** Premier lancement du logiciel : choix des jeux, raccourcis, progression. */
export function LauncherSetup() {
  const app = useIsLauncher();
  const [step, setStep] = useState<'hidden' | 'pick' | 'desk' | 'dl'>('hidden');
  const [picked, setPicked] = useState<string[]>(GAMES.map((g) => g.id));
  const [current, setCurrent] = useState(''), [pct, setPct] = useState(0);
  useEffect(() => { if (app && bridge() && !localStorage.getItem(DONE)) setStep('pick'); }, [app]);
  if (step === 'hidden') return null;
  const finish = () => { localStorage.setItem(DONE, '1'); setStep('hidden'); window.dispatchEvent(new Event('launcher-installed')); };
  const run = async (shortcut: boolean) => {
    const b = bridge(); if (!b) return finish();
    setStep('dl');
    for (const g of GAMES.filter((x) => picked.includes(x.id))) {
      setCurrent(g.name); setPct(0);
      const off = b.onProgress((p) => p.id === g.id && setPct(p.total ? Math.round((p.got / p.total) * 100) : Math.min(95, Math.round(p.got / 2000))));
      try { await b.install({ ...g, shortcut }); } catch { /* jeu suivant */ }
      off(); setPct(100);
    }
    finish();
  };
  return (
    <div className="launcher-overlay">
      <div className="launcher-panel">
        {step === 'pick' && <>
          <h2 className="ice-title">CHOISISSEZ LES JEUX À INSTALLER DIRECTEMENT</h2>
          <div className="space-y-2">{GAMES.map((g) => (
            <label key={g.id} className="launcher-check"><input type="checkbox" checked={picked.includes(g.id)} onChange={(e) => setPicked((p) => e.target.checked ? [...p, g.id] : p.filter((x) => x !== g.id))} />{g.name}</label>
          ))}</div>
          <div className="flex justify-between gap-3"><button className="launcher-btn-ghost" onClick={finish}>Passer</button><button className="btn-play" disabled={!picked.length} onClick={() => setStep('desk')}>SUIVANT</button></div>
        </>}
        {step === 'desk' && <>
          <h2 className="ice-title">AFFICHER LES JEUX SUR LE BUREAU ?</h2>
          <div className="flex justify-center gap-3"><button className="launcher-btn-ghost" onClick={() => run(false)}>NON</button><button className="btn-play" onClick={() => run(true)}>OUI</button></div>
        </>}
        {step === 'dl' && <>
          <h2 className="ice-title">Downloading {current}</h2>
          <div className="launcher-bar"><div style={{ width: pct + '%' }} /></div>
          <p className="text-center font-bold">{pct} %</p>
        </>}
      </div>
    </div>
  );
}

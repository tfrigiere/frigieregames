// FRIGIEREGAMES LAUNCHER — fenêtre native qui charge le site en direct (mises à jour instantanées après Publish).
const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const { projectFor, iconFor } = require('./projects.cjs');

const SITE = 'https://frigieregames.lovable.app';
const gamesDir = () => path.join(app.getPath('userData'), 'games');
const dbFile = () => path.join(app.getPath('userData'), 'installed.json');
const readDb = () => { try { return JSON.parse(fs.readFileSync(dbFile(), 'utf8')); } catch { return {}; } };
const writeDb = (d) => fs.writeFileSync(dbFile(), JSON.stringify(d));
const safeUrl = (u) => typeof u === 'string' && u.startsWith('https://');

function openGame(url, intro = false) {
  if (!safeUrl(url)) return;
  const w = new BrowserWindow({ width: 1280, height: 800, icon: iconFor(url), autoHideMenuBar: true, backgroundColor: '#050b1f', webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true } });
  if (!intro) { w.loadURL(url); return; }
  w.webContents.once('did-finish-load', () => {
    const timer = setTimeout(() => { if (!w.isDestroyed()) w.loadURL(url); }, 3800);
    w.once('closed', () => clearTimeout(timer));
  });
  w.loadFile(path.join(__dirname, 'intro.html'), { hash: projectFor(url)?.product ? 'product' : 'game' });
}

function writeGameShortcut(name, url) {
  if (process.platform !== 'win32') return;
  shell.writeShortcutLink(path.join(app.getPath('desktop'), String(name).replace(/[\\/:*?"<>|]/g, '') + '.lnk'), {
    target: process.execPath, args: '--play=' + url, icon: iconFor(url), iconIndex: 0, description: name,
  });
}

function refreshShortcuts() {
  for (const entry of Object.values(readDb())) {
    if (!entry || !safeUrl(entry.url)) continue;
    const project = projectFor(entry.url);
    const name = entry.name || project?.name;
    if (!name) continue;
    const shortcut = path.join(app.getPath('desktop'), String(name).replace(/[\\/:*?"<>|]/g, '') + '.lnk');
    if (!fs.existsSync(shortcut)) continue;
    // Update only shortcuts owned by this launcher; do not recreate deleted ones.
    try { const old = shell.readShortcutLink(shortcut); if (old.args === '--play=' + entry.url) writeGameShortcut(name, entry.url); } catch { /* Leave unrelated shortcuts untouched. */ }
  }
}

function createMain() {
  const win = new BrowserWindow({
    width: 1280, height: 860, autoHideMenuBar: true, backgroundColor: '#050b1f',
    title: 'FRIGIEREGAMES LAUNCHER', icon: path.join(__dirname, 'build', 'icon.png'),
    webPreferences: { preload: path.join(__dirname, 'preload.cjs'), contextIsolation: true, nodeIntegration: false },
  });
  win.webContents.setUserAgent(win.webContents.getUserAgent() + ' FrigiereLauncher/' + app.getVersion());
  win.webContents.setWindowOpenHandler(({ url }) => { if (safeUrl(url)) shell.openExternal(url); return { action: 'deny' }; });
  win.loadURL(SITE);
  return win;
}

ipcMain.handle('installed', () => readDb());
ipcMain.handle('size', async (_e, url) => {
  if (!safeUrl(url)) return 0;
  try { const r = await fetch(url); return (await r.arrayBuffer()).byteLength; } catch { return 0; }
});
ipcMain.handle('install', async (e, { id, name, url, shortcut }) => {
  if (!safeUrl(url) || !/^[\w-]{1,80}$/.test(id)) throw new Error('invalid');
  const res = await fetch(url);
  const total = Number(res.headers.get('content-length')) || 0;
  const reader = res.body.getReader(); const chunks = []; let got = 0;
  for (;;) {
    const { done, value } = await reader.read(); if (done) break;
    chunks.push(value); got += value.length;
    e.sender.send('progress', { id, got, total });
  }
  fs.mkdirSync(gamesDir(), { recursive: true });
  fs.writeFileSync(path.join(gamesDir(), id + '.html'), Buffer.concat(chunks.map((c) => Buffer.from(c))));
  if (shortcut) {
    writeGameShortcut(name, url);
  }
  const db = readDb(); db[id] = { url, name, size: got, at: Date.now() }; writeDb(db);
  return { size: got };
});
ipcMain.handle('play', (_e, url) => openGame(url));

const playArg = process.argv.find((a) => a.startsWith('--play='));
if (!app.requestSingleInstanceLock()) app.quit();
app.on('second-instance', (_e, argv) => { const a = argv.find((x) => x.startsWith('--play=')); if (a) openGame(a.slice(7), true); });
app.whenReady().then(() => { refreshShortcuts(); if (playArg) openGame(playArg.slice(7), true); else createMain(); });
app.on('window-all-closed', () => app.quit());

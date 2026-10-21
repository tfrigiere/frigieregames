// FRIGIEREGAMES LAUNCHER — fenêtre native qui charge le site en direct (mises à jour instantanées après Publish).
const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');

const SITE = 'https://frigieregames.lovable.app';
const gamesDir = () => path.join(app.getPath('userData'), 'games');
const dbFile = () => path.join(app.getPath('userData'), 'installed.json');
const readDb = () => { try { return JSON.parse(fs.readFileSync(dbFile(), 'utf8')); } catch { return {}; } };
const writeDb = (d) => fs.writeFileSync(dbFile(), JSON.stringify(d));
const safeUrl = (u) => typeof u === 'string' && u.startsWith('https://');

function openGame(url) {
  if (!safeUrl(url)) return;
  const w = new BrowserWindow({ width: 1280, height: 800, icon: path.join(__dirname, 'build', 'icon.png'), autoHideMenuBar: true, backgroundColor: '#050b1f' });
  w.loadURL(url);
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
    shell.writeShortcutLink(path.join(app.getPath('desktop'), String(name).replace(/[\\/:*?"<>|]/g, '') + '.lnk'), {
      target: process.execPath, args: '--play=' + url, icon: process.execPath, iconIndex: 0, description: name,
    });
  }
  const db = readDb(); db[id] = { url, size: got, at: Date.now() }; writeDb(db);
  return { size: got };
});
ipcMain.handle('play', (_e, url) => openGame(url));

const playArg = process.argv.find((a) => a.startsWith('--play='));
if (!app.requestSingleInstanceLock()) app.quit();
app.on('second-instance', (_e, argv) => { const a = argv.find((x) => x.startsWith('--play=')); if (a) openGame(a.slice(7)); });
app.whenReady().then(() => { if (playArg) openGame(playArg.slice(7)); else createMain(); });
app.on('window-all-closed', () => app.quit());

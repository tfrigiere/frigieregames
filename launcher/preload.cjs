const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('frigiere', {
  installed: () => ipcRenderer.invoke('installed'),
  size: (url) => ipcRenderer.invoke('size', url),
  install: (opts) => ipcRenderer.invoke('install', opts),
  play: (url) => ipcRenderer.invoke('play', url),
  onProgress: (cb) => { const h = (_e, p) => cb(p); ipcRenderer.on('progress', h); return () => ipcRenderer.removeListener('progress', h); },
});

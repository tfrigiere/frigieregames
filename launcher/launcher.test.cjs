const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { projectFor, iconFor } = require('./projects.cjs');

test('Each official project uses its own bundled Windows icon', () => {
  for (const [id, host] of [['monde', 'mondedesgeographes'], ['vacances', 'aquandlesprochainesvacances'], ['sourichat', 'sourichatmap'], ['airports', 'companyairports']]) {
    const icon = iconFor(`https://${host}.lovable.app/`);
    assert.equal(path.basename(icon), id + '.ico');
    assert.equal(fs.readFileSync(icon).readUInt16LE(2), 1);
  }
});
test('Games show GAME; the holidays application shows PRODUCT', () => {
  assert.equal(projectFor('https://mondedesgeographes.lovable.app/').product, false);
  assert.equal(projectFor('https://sourichatmap.lovable.app/').product, false);
  assert.equal(projectFor('https://companyairports.lovable.app/').product, false);
  assert.equal(projectFor('https://aquandlesprochainesvacances.lovable.app/').product, true);
});
test('Desktop launch shows the local studio intro before navigating, including a second instance', async () => {
  const windows = [], handlers = {}, ipc = {}, timers = [];
  class Window {
    constructor(options) { this.options = options; this.events = {}; this.webContents = { once: (key, fn) => { this.loaded = fn; } }; windows.push(this); }
    loadFile(file, options) { this.file = file; this.hash = options.hash; this.loaded(); }
    loadURL(url) { this.url = url; }
    once(key, fn) { this.events[key] = fn; }
    isDestroyed() { return false; }
  }
  const electron = { BrowserWindow: Window, ipcMain: { handle: (key, fn) => { ipc[key] = fn; } }, shell: {}, app: { getPath: () => '/tmp/launcher-test', requestSingleInstanceLock: () => true, on: (key, fn) => { handlers[key] = fn; }, whenReady: () => Promise.resolve(), quit() {} } };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, 'main.cjs'), 'utf8'), {
    require: (id) => id === 'electron' ? electron : id === 'fs' ? { readFileSync: () => '{}', existsSync: () => false } : require(id),
    __dirname, process: { argv: ['launcher', '--play=https://mondedesgeographes.lovable.app/'], platform: 'linux' },
    setTimeout: (fn, ms) => { assert.equal(ms, 3800); timers.push(fn); }, clearTimeout() {},
  });
  await Promise.resolve();
  assert.equal(windows[0].hash, 'game');
  assert.equal(path.basename(windows[0].file), 'intro.html');
  assert.equal(windows[0].url, undefined);
  timers.shift()();
  assert.equal(windows[0].url, 'https://mondedesgeographes.lovable.app/');
  handlers['second-instance'](null, ['launcher', '--play=https://aquandlesprochainesvacances.lovable.app/']);
  assert.equal(windows[1].hash, 'product');
  assert.equal(windows[1].options.webPreferences.nodeIntegration, false);
  ipc.play(null, 'https://companyairports.lovable.app/');
  assert.equal(windows[2].file, undefined);
  assert.equal(windows[2].url, 'https://companyairports.lovable.app/');
});
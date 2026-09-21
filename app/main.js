// DTDA Ultimate Mod Tool - Electron shell. Loads the existing skin_builder.html as a desktop app.
// Dev: html lives one folder up (../). Packaged: electron-builder copies it to resources/app/.
const { app, BrowserWindow, Menu, ipcMain, dialog, shell, clipboard } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

function htmlPath(name) {
  return app.isPackaged
    ? path.join(process.resourcesPath, 'app', name)
    : path.join(__dirname, '..', name);
}

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 1440,
    height: 920,
    backgroundColor: '#0e0d12',
    icon: path.join(__dirname, 'icon.ico'),
    title: 'DTDA Ultimate Mod Tool',
    autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, nodeIntegration: false, preload: path.join(__dirname, 'preload.js') }
  });
  win.maximize();
  // Read optional settings.txt (sits next to the exe when packaged; ../ in dev) to toggle sounds.
  const _sf = { startup: '1', music: '1' };
  for (const _p of [path.join(path.dirname(app.getPath('exe')), 'settings.txt'), path.join(__dirname, '..', 'settings.txt')]) {
    try { const _t = fs.readFileSync(_p, 'utf8'); if (/startup_sound\s*=\s*off/i.test(_t)) _sf.startup = '0'; if (/autoplay_music\s*=\s*off/i.test(_t)) _sf.music = '0'; break; } catch (e) {}
  }
  win.loadFile(htmlPath('index.html'), { query: { startup: _sf.startup, music: _sf.music } });
  // Belt-and-braces: also set the icon after creation (some Windows taskbar paths ignore the constructor option).
  try { win.setIcon(path.join(__dirname, 'icon.ico')); } catch (e) { /* icon is best-effort */ }

  // Dev-only watcher: reload the window when the local HTML/data files are edited. Skipped in the packaged app.
  if (!app.isPackaged) {
    try {
      const dir = path.dirname(htmlPath('skin_builder.html'));
      let t = null;
      fs.watch(dir, (ev, fn) => {
        if (fn && /(skin_builder\.html|camo_fitter\.html|enemies_data\.js|atlan_data\.js)$/i.test(fn)) {
          clearTimeout(t);
          t = setTimeout(() => { if (win && !win.isDestroyed()) win.webContents.reload(); }, 450);
        }
      });
    } catch (e) { /* watching is best-effort */ }
  }

  // (QA: "CTRL+C / CTRL+P is broken across the tool") Setting the application menu to null ALSO removes Electron's
  // built-in edit accelerators, so Ctrl+C / Ctrl+V / Ctrl+X / Ctrl+A / Ctrl+Z stop working everywhere in the app.
  // Instead we install a minimal Edit menu purely to restore those roles. `autoHideMenuBar: true` keeps the bar
  // invisible, so the UI looks exactly the same — the shortcuts just work again.
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' }, { role: 'redo' }, { type: 'separator' },
        { role: 'cut' }, { role: 'copy' }, { role: 'paste' },
        { role: 'selectAll' }
      ]
    }
  ]));
  win.setMenuBarVisibility(false);   // belt and braces: never show the bar, even on Alt

  // Mute the theme when the window is minimised or another window takes focus; resume when it returns.
  // (DOM blur/visibility events are unreliable in Electron, so drive it from real window events here.)
  const sendMusic = (cmd) => { try { if (win && !win.isDestroyed()) win.webContents.send('music', cmd); } catch (e) {} };
  win.on('blur', () => sendMusic('suspend'));
  win.on('minimize', () => sendMusic('suspend'));
  win.on('hide', () => sendMusic('suspend'));
  win.on('focus', () => sendMusic('resume'));
  win.on('restore', () => sendMusic('resume'));
  win.on('show', () => sendMusic('resume'));

  // Force-reload (Ctrl+Shift+R / Ctrl+F5) → tell the page to offer a FULL factory reset instead of reloading. Reserved
  // hard-reload combos don't reach the renderer's own keydown, so we catch them here (fires in dev + packaged) and
  // preventDefault so nothing reloads until the user confirms in-page. Plain reload (Ctrl+R / F5) is left alone.
  win.webContents.on('before-input-event', (e, input) => {
    if (input.type !== 'keyDown') return;
    const k = (input.key || '').toLowerCase();
    const force = (input.control || input.meta) && ((input.shift && k === 'r') || k === 'f5');
    if (force) { e.preventDefault(); try { win.webContents.send('sb-force-reset'); } catch (_) {} }
  });
}

// In-page "View" menu actions (from preload bridge).
ipcMain.on('view-action', (e, name) => {
  const w = BrowserWindow.fromWebContents(e.sender);
  if (!w) return;
  const wc = w.webContents;
  switch (name) {
    case 'skinBuilder': w.loadFile(htmlPath('skin_builder.html'), { query: { nav: '1' } }); break;
    case 'camoFitter': w.loadFile(htmlPath('camo_fitter.html')); break;
    case 'reload': wc.reload(); break;
    case 'forceReload': wc.reloadIgnoringCache(); break;
    case 'devtools': wc.toggleDevTools(); break;
    case 'zoomIn': wc.setZoomLevel(wc.getZoomLevel() + 0.5); break;
    case 'zoomOut': wc.setZoomLevel(wc.getZoomLevel() - 0.5); break;
    case 'zoomReset': wc.setZoomLevel(0); break;
    case 'quit': app.quit(); break;
  }
});

// Atlan integration: pick a file/folder, or launch the user's own Atlan packager/loader exe.
ipcMain.handle('atlan-pick-file', async (e, title) => {
  const w = BrowserWindow.fromWebContents(e.sender);
  const r = await dialog.showOpenDialog(w, {
    title, properties: ['openFile'],
    filters: [{ name: 'Programs', extensions: ['exe', 'bat', 'cmd'] }, { name: 'All files', extensions: ['*'] }]
  });
  return (r.canceled || !r.filePaths.length) ? null : r.filePaths[0];
});
ipcMain.handle('atlan-pick-folder', async (e, title) => {
  const w = BrowserWindow.fromWebContents(e.sender);
  const r = await dialog.showOpenDialog(w, { title, properties: ['openDirectory'] });
  return (r.canceled || !r.filePaths.length) ? null : r.filePaths[0];
});
ipcMain.handle('atlan-run', async (e, { exePath, args }) => {
  try {
    if (!exePath || !fs.existsSync(exePath)) return { ok: false, error: 'File not found: ' + exePath };
    if (!args || args.length === 0) {
      // No args (the Packager): launch EXACTLY like a double-click so its own console/TUI window shows.
      // shell.openPath == ShellExecute == double-click. (The old spawn used detached:true → DETACHED_PROCESS → NO console,
      // which is why the terminal never appeared even though it packaged.)
      const err = await shell.openPath(exePath);
      return { ok: !err, error: err || '' };
    }
    // With args (the Loader, --notimer): spawn WITHOUT detached so the console app still gets its own visible console window.
    const child = spawn(exePath, args, { stdio: 'ignore', cwd: path.dirname(exePath), windowsHide: false });
    child.unref();
    return { ok: true };
  } catch (err) { return { ok: false, error: String(err && err.message || err) }; }
});
// Is a process running? Used by Load & Launch to know when the GAME is actually up, so its progress bar
// ends on the real event instead of a guessed delay. tasklist is on every Windows box, no dependency.
ipcMain.handle('atlan-proc-running', async (e, { name }) => {
  try {
    const exe = String(name || '').replace(/[^A-Za-z0-9_.-]/g, '');
    if (!exe) return { ok: false, running: false };
    const out = await new Promise(res => {
      const p = spawn('tasklist', ['/FI', 'IMAGENAME eq ' + exe, '/NH'], { windowsHide: true });
      let s = ''; p.stdout.on('data', d => s += d);
      p.on('close', () => res(s)); p.on('error', () => res(''));
    });
    return { ok: true, running: out.toLowerCase().includes(exe.toLowerCase()) };
  } catch (err) { return { ok: false, running: false, error: String(err && err.message || err) }; }
});
// ── SEAMLESS PACKAGING (Atlan Mod Packager 2.2+, FlavorfulGecko5) ──────────────────────────────────────
// The packager now accepts CLI args:  AtlanModPackager.exe [--input <mod_folder>] [--output <output_zip>]
//                                     [--gamedir <game_folder>]
// so we can package straight from the tool — no "pick the mod folder / pick where to save" dialogs. We run it
// hidden, capture stdout+stderr, and only report success if it exited 0, printed no ERROR line, AND the zip exists.
ipcMain.handle('atlan-package', async (e, { exePath, input, output, gamedir }) => {
  try {
    if (!exePath || !fs.existsSync(exePath)) return { ok: false, error: 'Packager not found:\n' + exePath };
    if (!input || !fs.existsSync(input)) return { ok: false, error: 'Mod folder not found:\n' + input };
    try { fs.mkdirSync(path.dirname(output), { recursive: true }); } catch (_) {}
    const args = ['--input', input, '--output', output];
    if (gamedir) args.push('--gamedir', gamedir);
    const res = await new Promise((resolve) => {
      let so = '', se = '', ch;
      try { ch = spawn(exePath, args, { cwd: path.dirname(exePath), windowsHide: true }); }
      catch (err) { return resolve({ code: -1, so: '', se: String(err && err.message || err) }); }
      // ★ (2026-09-21) LIVE PROGRESS. Measured, not assumed: the output zip stays 0 bytes for ~74% of a run
      // (28 of 38s on a 2.5GB / 970-PNG mod) and then appears at full size, so a bytes-on-disk bar can only
      // ever creep and stall — which is exactly the "stuck at the end" report. But the packager PRINTS its
      // work: "Found 970 alias definitions" up front, then one "cN_a.png (...)" / "cN_e.png (...)" line per
      // image. Counted on a real run: 970 announced, 970 lines emitted. Forward the stream so the renderer
      // can show a true count instead of a guess. `so` is still accumulated for the final error log.
      ch.stdout.on('data', d => { so += d; try { e.sender.send('atlan-package-progress', String(d)); } catch (_) {} });
      ch.stderr.on('data', d => se += d);
      ch.on('error', err => resolve({ code: -1, so, se: String(err && err.message || err) }));
      ch.on('close', code => resolve({ code, so, se }));
    });
    const out = ((res.so || '') + (res.se || '')).replace(/\r/g, '');
    const madeZip = !!output && fs.existsSync(output);
    const hardFail = res.code !== 0 || /FATAL ERROR/i.test(out);
    if (hardFail || !madeZip) {
      const firstErr = (out.match(/(?:FATAL ERROR|ERROR):[^\n]*/i) || [])[0] || '';
      return { ok: false, error: firstErr || ('The packager exited with code ' + res.code + ' and produced no zip.'), log: out.slice(-4000) };
    }
    let bytes = 0; try { bytes = fs.statSync(output).size; } catch (_) {}
    return { ok: true, zip: output, bytes, log: out.slice(-4000) };
  } catch (err) { return { ok: false, error: String(err && err.message || err) }; }
});
// Size of a file, and the total size of a folder tree. Used to drive a REAL packaging progress bar: the
// Atlan packager reports nothing, but the zip it writes grows on disk and we know how much is going in.
ipcMain.handle('atlan-size', async (e, p) => {
  try { return { ok: true, bytes: fs.statSync(p).size }; }
  catch (_) { return { ok: false, bytes: 0 }; }            // not created yet is normal, not an error
});
ipcMain.handle('atlan-dir-size', async (e, dir) => {
  try {
    let total = 0;
    (function walk(d) {
      for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
        const f = path.join(d, ent.name);
        if (ent.isDirectory()) walk(f); else { try { total += fs.statSync(f).size; } catch (_) {} }
      }
    })(dir);
    return { ok: true, bytes: total };
  } catch (err) { return { ok: false, bytes: 0, error: String(err && err.message || err) }; }
});
ipcMain.handle('atlan-copy', async (e, text) => {
  try { clipboard.writeText(String(text || '')); return { ok: true }; } catch (err) { return { ok: false, error: String(err && err.message || err) }; }
});
ipcMain.handle('atlan-open', async (e, p) => {
  try { const err = await shell.openPath(p); return { ok: !err, error: err || '' }; }
  catch (err) { return { ok: false, error: String(err && err.message || err) }; }
});
// ★ (Mason 2026-08-07) BUILT-IN SCREENSHOT — because OS screen capture comes out BLANK for this window.
// The app leans on backdrop-filter everywhere, so its layers are GPU-composited; BitBlt/PrintWindow-style
// capture (which most screenshot tools and overlays use) reads black for those regions, and Mason also runs
// a system-wide DWM translucency stack that makes it worse. Nothing in the app is at fault and there is no
// setting to flip.
// capturePage() asks the RENDERER for its own composited bitmap, so it never touches the OS capture path and
// cannot come back blank. Saves a PNG and also puts it on the clipboard so it can be pasted straight into
// Discord or a forum post.
ipcMain.handle('atlan-screenshot', async (e, { dir } = {}) => {
  try {
    if (!win || win.isDestroyed()) return { ok: false, error: 'No window' };
    const img = await win.webContents.capturePage();          // full window content
    if (img.isEmpty()) return { ok: false, error: 'Capture returned an empty image' };
    try { clipboard.writeImage(img); } catch (_) { /* clipboard is best-effort */ }
    const outDir = dir && String(dir).trim()
      ? String(dir)
      : path.join(app.getPath('pictures'), 'DTDA Mod Tool');
    fs.mkdirSync(outDir, { recursive: true });
    const d = new Date();
    const pad = n => String(n).padStart(2, '0');
    const name = `DTDA_${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_` +
                 `${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}.png`;
    const file = path.join(outDir, name);
    fs.writeFileSync(file, img.toPNG());
    return { ok: true, file, copied: true };
  } catch (err) { return { ok: false, error: String(err && err.message || err) }; }
});
// List files in a folder (optionally filtered by extension) — used to show/clean the game mods folder.
ipcMain.handle('atlan-list-dir', async (e, { dir, exts }) => {
  try {
    if (!dir || !fs.existsSync(dir)) return { ok: false, error: 'Folder not found', files: [] };
    let names = fs.readdirSync(dir, { withFileTypes: true }).filter(d => d.isFile()).map(d => d.name);
    if (exts && exts.length) names = names.filter(n => exts.some(x => n.toLowerCase().endsWith(String(x).toLowerCase())));
    return { ok: true, files: names.map(n => ({ name: n, path: path.join(dir, n) })) };
  } catch (err) { return { ok: false, error: String(err && err.message || err), files: [] }; }
});
// Delete specific files (mod conflict cleanup). Only paths the renderer listed from the chosen mods folder.
ipcMain.handle('atlan-delete-files', async (e, { paths }) => {
  let deleted = 0; const failed = [];
  for (const p of (paths || [])) { try { fs.unlinkSync(p); deleted++; } catch (err) { failed.push(p); } }
  return { ok: failed.length === 0, deleted, failed };
});
// Read an image from a linked reference folder (e.g. Kuddly's Slayer Kit) and return a small thumbnail data URL.
// Used to preview the vanilla PBR maps in the advanced texture panel. Read-only; searches by basename as a fallback.
const _kitThumbCache = {};
function _findByBasename(root, base, depth) {
  try {
    if (depth > 4) return null;
    for (const d of fs.readdirSync(root, { withFileTypes: true })) {
      const fp = path.join(root, d.name);
      if (d.isFile() && d.name.toLowerCase() === base.toLowerCase()) return fp;
      if (d.isDirectory()) { const hit = _findByBasename(fp, base, depth + 1); if (hit) return hit; }
    }
  } catch (e) {}
  return null;
}
ipcMain.handle('atlan-read-thumb', async (e, { root, rel, size }) => {
  try {
    if (!root || !rel) return { ok: false, error: 'missing path' };
    const ck = root + '|' + rel + '|' + (size || 160);
    if (_kitThumbCache[ck]) return { ok: true, dataUrl: _kitThumbCache[ck], cached: true };
    let fp = path.join(root, rel);
    if (!fs.existsSync(fp)) fp = _findByBasename(root, path.basename(rel), 0);
    if (!fp || !fs.existsSync(fp)) return { ok: false, error: 'not found' };
    const { nativeImage } = require('electron');
    let img = nativeImage.createFromPath(fp);
    if (!img || img.isEmpty()) return { ok: false, error: 'unreadable image' };
    const s = Math.max(32, Math.min(512, size || 160));
    const dim = img.getSize();
    if (dim.width > s) img = img.resize({ width: s, quality: 'good' });
    const dataUrl = img.toDataURL();
    if (Object.keys(_kitThumbCache).length < 400) _kitThumbCache[ck] = dataUrl;
    return { ok: true, dataUrl };
  } catch (err) { return { ok: false, error: String(err && err.message || err) }; }
});
// Decode a packaged ATIM/BIM texture (Oodle-compressed BC1/BC7) to a PNG thumbnail data URL, via the bundled Python
// decoder (decode_atim.py). We pass the raw bytes over IPC (works for both folder-picker and drag imports, no disk path
// needed), write them to a temp file, run Python, and return the data URL. Results are cached by cacheKey.
const _atimCache = {};
let _pyExe = null;
function findPython() {
  if (_pyExe) return _pyExe;
  const cands = [
    process.env.LOCALAPPDATA ? path.join(process.env.LOCALAPPDATA, 'Programs', 'Python', 'Python312', 'python.exe') : null,
    process.env.LOCALAPPDATA ? path.join(process.env.LOCALAPPDATA, 'Programs', 'Python', 'Python311', 'python.exe') : null,
    'C:\\Python312\\python.exe', 'C:\\Python311\\python.exe',
  ].filter(Boolean);
  for (const c of cands) { if (fs.existsSync(c)) { _pyExe = c; return c; } }
  _pyExe = 'python'; // fall back to PATH
  return _pyExe;
}
function decodeScriptPath() {
  return app.isPackaged ? path.join(process.resourcesPath, 'app', 'tools', 'decode_atim.py') : path.join(__dirname, '..', 'tools', 'decode_atim.py');
}
ipcMain.handle('atlan-decode-atim', async (e, { bytes, size, cacheKey, kind }) => {
  try {
    if (cacheKey && _atimCache[cacheKey]) return { ok: true, dataUrl: _atimCache[cacheKey], cached: true };
    const os = require('os');
    const tmp = path.join(os.tmpdir(), 'dtda_atim_' + process.pid + '_' + Math.floor(Math.random() * 1e9) + '.bin');
    fs.writeFileSync(tmp, Buffer.from(bytes));
    const py = findPython(), script = decodeScriptPath();
    const args = [script, tmp, String(size || 256)];
    if (kind) args.push(String(kind));
    const out = await new Promise((res) => {
      let so = '', se = '';
      let ch;
      try { ch = spawn(py, args); }
      catch (err) { return res({ so: '', se: String(err) }); }
      ch.stdout.on('data', d => so += d);
      ch.stderr.on('data', d => se += d);
      ch.on('error', err => res({ so: '', se: String(err && err.message || err) }));
      ch.on('close', () => res({ so, se }));
    });
    try { fs.unlinkSync(tmp); } catch (_) {}
    const s = (out.so || '').trim();
    if (s.startsWith('data:')) {
      if (cacheKey && Object.keys(_atimCache).length < 600) _atimCache[cacheKey] = s;
      return { ok: true, dataUrl: s };
    }
    return { ok: false, error: s || out.se || 'decode failed' };
  } catch (err) { return { ok: false, error: String(err && err.message || err) }; }
});
// Write the current build to a known folder (Documents\DTDA Mod Exports\<name>_Source) and return its path,
// so the Package button can hand that exact folder to the Atlan Packager.
ipcMain.handle('atlan-write-export', async (e, { name, files, baseDir }) => {
  try {
    const safe = String(name || 'MyDoomSkin').replace(/[^\w-]/g, '_');
    const base = (baseDir && fs.existsSync(baseDir)) ? baseDir : path.join(app.getPath('documents'), 'DTDA Mod Exports');
    const dir = path.join(base, safe + '_Source');
    fs.mkdirSync(dir, { recursive: true });
    for (const old of fs.readdirSync(dir)) { try { fs.unlinkSync(path.join(dir, old)); } catch (e2) {} }
    let n = 0;
    for (const f of (files || [])) { const dest = path.join(dir, f.name); fs.mkdirSync(path.dirname(dest), { recursive: true }); fs.writeFileSync(dest, Buffer.from(f.data)); n++; }
    try { clipboard.writeText(dir); } catch (e2) {}  // so the user can paste it into Atlan's folder box
    return { ok: true, dir, count: n };
  } catch (err) { return { ok: false, error: String(err && err.message || err) }; }
});

// ── Lossless re-package: zip a mod FOLDER straight from disk (deflate/method-8, files-only, forward-slash paths). ──
// Done in the main process so huge packaged mods (500MB+ of compiled .tga) never pass through the renderer/IPC.
const zlib = require('zlib');
const _crcTab = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
function _crc32(b) { let c = 0xFFFFFFFF; for (let i = 0; i < b.length; i++) c = _crcTab[(c ^ b[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
function _walk(d) { let out = []; for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) out = out.concat(_walk(p)); else out.push(p); } return out; }
function _zipFolder(root) {
  const skip = /\.(exe|def|config|dll|bat)$/i;   // Atlan loader binaries a packaged download bundles — not mod content
  const paths = _walk(root).filter(p => !skip.test(p));
  const locals = [], central = []; let off = 0, count = 0;
  for (const p of paths) {
    const name = path.relative(root, p).split(path.sep).join('/');
    const data = fs.readFileSync(p);
    let comp = zlib.deflateRawSync(data), method = 8;
    if (comp.length >= data.length) { comp = data; method = 0; }
    const crc = _crc32(data), nm = Buffer.from(name, 'utf8');
    const lh = Buffer.alloc(30); lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(0, 6); lh.writeUInt16LE(method, 8); lh.writeUInt16LE(0, 10); lh.writeUInt16LE(0, 12); lh.writeUInt32LE(crc, 14); lh.writeUInt32LE(comp.length, 18); lh.writeUInt32LE(data.length, 22); lh.writeUInt16LE(nm.length, 26); lh.writeUInt16LE(0, 28);
    locals.push(lh, nm, comp);
    const ch = Buffer.alloc(46); ch.writeUInt32LE(0x02014b50, 0); ch.writeUInt16LE(20, 4); ch.writeUInt16LE(20, 6); ch.writeUInt16LE(0, 8); ch.writeUInt16LE(method, 10); ch.writeUInt16LE(0, 12); ch.writeUInt16LE(0, 14); ch.writeUInt32LE(crc, 16); ch.writeUInt32LE(comp.length, 20); ch.writeUInt32LE(data.length, 24); ch.writeUInt16LE(nm.length, 28); ch.writeUInt32LE(off, 42);
    central.push(ch, nm);
    off += 30 + nm.length + comp.length; count++;
  }
  const centralBuf = Buffer.concat(central);
  const eocd = Buffer.alloc(22); eocd.writeUInt32LE(0x06054b50, 0); eocd.writeUInt16LE(count, 8); eocd.writeUInt16LE(count, 10); eocd.writeUInt32LE(centralBuf.length, 12); eocd.writeUInt32LE(off, 16);
  return { buf: Buffer.concat([...locals, centralBuf, eocd]), count };
}
ipcMain.handle('atlan-zip-folder', async (e, { srcDir, name, outDir }) => {
  try {
    if (!srcDir || !fs.existsSync(srcDir)) return { ok: false, error: 'Source folder not found: ' + srcDir };
    // Zip relative to the folder that actually holds darkagesmod.txt (in case the user picked a parent).
    let root = srcDir;
    const hits = _walk(srcDir).filter(p => /darkagesmod\.txt$/i.test(p));
    if (hits.length) root = path.dirname(hits.sort((a, b) => a.length - b.length)[0]);
    const safe = String(name || 'RepackagedMod').replace(/[^\w-]/g, '_');
    const base = (outDir && fs.existsSync(outDir)) ? outDir : path.join(app.getPath('documents'), 'DTDA Mod Exports');
    fs.mkdirSync(base, { recursive: true });
    const dest = path.join(base, safe + '.zip');
    const { buf, count } = _zipFolder(root);
    fs.writeFileSync(dest, buf);
    try { clipboard.writeText(dest); } catch (e2) {}
    return { ok: true, path: dest, count, bytes: buf.length, root };
  } catch (err) { return { ok: false, error: String(err && err.message || err) }; }
});

app.whenReady().then(() => {
  app.setAppUserModelId('com.mason.doomskinbuilder');
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });

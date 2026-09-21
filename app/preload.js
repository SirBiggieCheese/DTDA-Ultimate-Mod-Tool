// Minimal, safe bridge so the in-page "View" menu can trigger real Electron actions
// (reload, devtools, zoom, quit, navigate) without enabling nodeIntegration.
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('doomView', {
  action: (name) => ipcRenderer.send('view-action', String(name || '')),
  // Main process fires this when it catches a hard-reload key combo (Ctrl+Shift+R / Ctrl+F5) → page offers a factory reset.
  onForceReset: (cb) => ipcRenderer.on('sb-force-reset', () => { try { cb(); } catch (_) {} })
});
contextBridge.exposeInMainWorld('doomAudio', {
  onMusic: (cb) => ipcRenderer.on('music', (e, cmd) => cb(cmd))
});
// Atlan integration: let the renderer ask for a file/folder path and launch an external exe.
// This only OPENS the user's own Atlan tools (packager/loader) — it stores no data and sends nothing anywhere.
contextBridge.exposeInMainWorld('doomAtlan', {
  pickFile: (title) => ipcRenderer.invoke('atlan-pick-file', String(title || 'Select file')),
  pickFolder: (title) => ipcRenderer.invoke('atlan-pick-folder', String(title || 'Select folder')),
  run: (exePath, args) => ipcRenderer.invoke('atlan-run', { exePath: String(exePath || ''), args: Array.isArray(args) ? args : [] }),
  openPath: (p) => ipcRenderer.invoke('atlan-open', String(p || '')),
  procRunning: (name) => ipcRenderer.invoke('atlan-proc-running', { name: String(name || '') }),
  writeExport: (name, files, baseDir) => ipcRenderer.invoke('atlan-write-export', { name: String(name || 'MyDoomSkin'), files, baseDir: baseDir ? String(baseDir) : '' }),
  zipFolder: (srcDir, name, outDir) => ipcRenderer.invoke('atlan-zip-folder', { srcDir: String(srcDir || ''), name: String(name || 'RepackagedMod'), outDir: outDir ? String(outDir) : '' }),
  copyText: (t) => ipcRenderer.invoke('atlan-copy', String(t || '')),
  // Captures the window's own composited bitmap via the renderer, so it works even though OS screen capture
  // returns blank for this window (GPU-composited backdrop-filter layers). Saves a PNG AND copies it.
  screenshot: (dir) => ipcRenderer.invoke('atlan-screenshot', { dir: dir ? String(dir) : '' }),
  // Seamless one-click packaging via the Atlan Packager's CLI args (2.2+). Returns {ok, zip, bytes, error, log}.
  // Live packaging output. The packager announces "Found N alias definitions" then prints one line per
  // image it converts, so the renderer can count real work done instead of estimating. Returns an
  // unsubscribe fn — the progress box calls it when it closes, so runs never stack up listeners.
  onPackageProgress: (cb) => {
    const h = (e, chunk) => { try { cb(String(chunk || '')); } catch (_) {} };
    ipcRenderer.on('atlan-package-progress', h);
    return () => { try { ipcRenderer.removeListener('atlan-package-progress', h); } catch (_) {} };
  },
  fileSize: (p) => ipcRenderer.invoke('atlan-size', p),
  dirSize:  (d) => ipcRenderer.invoke('atlan-dir-size', d),
  packageMod: (exePath, input, output, gamedir) => ipcRenderer.invoke('atlan-package', {
    exePath: String(exePath || ''), input: String(input || ''), output: String(output || ''), gamedir: String(gamedir || '')
  }),
  listDir: (dir, exts) => ipcRenderer.invoke('atlan-list-dir', { dir: String(dir || ''), exts: Array.isArray(exts) ? exts : [] }),
  deleteFiles: (paths) => ipcRenderer.invoke('atlan-delete-files', { paths: Array.isArray(paths) ? paths.map(String) : [] }),
  // Read an image from disk (e.g. a linked reference kit) and return a downscaled thumbnail as a data URL for previews.
  readThumb: (root, rel, size) => ipcRenderer.invoke('atlan-read-thumb', { root: String(root || ''), rel: String(rel || ''), size: Number(size) || 160 }),
  // Decode a packaged ATIM/BIM (Oodle BC1/BC7) texture's bytes → PNG thumbnail data URL (via the bundled Python decoder).
  decodeAtim: (bytes, size, cacheKey, kind) => ipcRenderer.invoke('atlan-decode-atim', { bytes, size: Number(size) || 256, cacheKey: String(cacheKey || ''), kind: String(kind || '') })
});

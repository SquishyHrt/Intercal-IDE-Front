import { app as i, BrowserWindow as c, ipcMain as a } from "electron";
import { createRequire as w } from "node:module";
import { fileURLToPath as f } from "node:url";
import { spawn as R } from "child_process";
import e from "node:path";
w(import.meta.url);
const l = e.dirname(f(import.meta.url));
process.env.APP_ROOT = e.join(l, "..");
const s = process.env.VITE_DEV_SERVER_URL, u = e.join(process.env.APP_ROOT, "dist-electron"), p = e.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = s ? e.join(process.env.APP_ROOT, "public") : p;
let o, n = null;
function m() {
  o = new c({
    icon: e.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: e.join(l, "preload.mjs")
    }
  }), o.webContents.on("did-finish-load", () => {
    o == null || o.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), s ? o.loadURL(s) : o.loadFile(e.join(p, "index.html"));
}
i.on("window-all-closed", () => {
  process.platform !== "darwin" && (i.quit(), o = null), n && n.kill();
});
i.on("activate", () => {
  c.getAllWindows().length === 0 && m();
});
a.on("exit-app", () => {
  i.quit(), n && n.kill();
});
a.handle("get-cwd", () => process.cwd());
a.on("open-tips", (d, t) => {
  const r = new c({
    width: 550,
    height: 220,
    webPreferences: {
      nodeIntegration: !0,
      contextIsolation: !1
    }
  });
  r.setMenu(null), r.title = "Tip of the Day", r.loadURL(`file://${e.join(u, "TipOfTheDay.html")}?text=${encodeURIComponent(t)}`);
});
i.whenReady().then(() => {
  m();
  const d = i.isPackaged ? e.join(process.resourcesPath, "ping-1.0-runner") : e.join(l, "..", "src", "backend", "ping-1.0-runner");
  n = R(d), n.stdout.on("data", (t) => {
    console.log(`Backend stdout: ${t}`);
  }), n.stderr.on("data", (t) => {
    console.error(`Backend stderr: ${t}`);
  }), n.on("close", (t) => {
    console.log(`Backend process exited with code ${t}`);
  });
});
export {
  u as MAIN_DIST,
  p as RENDERER_DIST,
  s as VITE_DEV_SERVER_URL
};

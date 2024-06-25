import { app as n, BrowserWindow as t, ipcMain as r } from "electron";
import { createRequire as p } from "node:module";
import { fileURLToPath as l } from "node:url";
import o from "node:path";
p(import.meta.url);
const s = o.dirname(l(import.meta.url));
process.env.APP_ROOT = o.join(s, "..");
const i = process.env.VITE_DEV_SERVER_URL, w = o.join(process.env.APP_ROOT, "dist-electron"), c = o.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = i ? o.join(process.env.APP_ROOT, "public") : c;
let e;
function a() {
  e = new t({
    icon: o.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: o.join(s, "preload.mjs")
    }
  }), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), i ? e.loadURL(i) : e.loadFile(o.join(c, "index.html"));
}
n.on("window-all-closed", () => {
  process.platform !== "darwin" && (n.quit(), e = null);
});
n.on("activate", () => {
  t.getAllWindows().length === 0 && a();
});
r.on("exit-app", () => {
  n.quit();
});
r.handle("get-cwd", () => process.cwd());
n.whenReady().then(a);
export {
  w as MAIN_DIST,
  c as RENDERER_DIST,
  i as VITE_DEV_SERVER_URL
};

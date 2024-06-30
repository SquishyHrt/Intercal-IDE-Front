import { app as s, BrowserWindow as d, ipcMain as a } from "electron";
import { createRequire as u } from "node:module";
import { fileURLToPath as w } from "node:url";
import { spawn as h } from "child_process";
import e from "node:path";
import c from "os";
u(import.meta.url);
const p = e.dirname(w(import.meta.url));
process.env.APP_ROOT = e.join(p, "..");
const l = process.env.VITE_DEV_SERVER_URL, R = e.join(process.env.APP_ROOT, "dist-electron"), m = e.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = l ? e.join(process.env.APP_ROOT, "public") : m;
let o, t = null;
function f() {
  o = new d({
    icon: e.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: e.join(p, "preload.mjs")
    }
  }), s.isPackaged && o.setMenu(null), o.webContents.on("did-finish-load", () => {
    o == null || o.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), l ? o.loadURL(l) : o.loadFile(e.join(m, "index.html"));
}
function P() {
  let r = "ping-1.0-runner";
  (c.platform() === "darwin" || c.arch() === "arm") && (r = "ping-1.0-runner-arm"), c.platform() === "win32" && (r = "ping-1.0-runner.exe");
  const i = s.isPackaged ? e.join(process.resourcesPath, r) : e.join(p, "..", "src", "backend", r);
  t = h(i), t.stdout.on("data", (n) => {
    console.log(`Backend stdout: ${n}`);
  }), t.stderr.on("data", (n) => {
    console.error(`Backend stderr: ${n}`);
  }), t.on("close", (n) => {
    console.log(`Backend process exited with code ${n}`);
  });
}
s.on("window-all-closed", () => {
  process.platform !== "darwin" && (s.quit(), o = null), t && t.kill();
});
s.on("activate", () => {
  d.getAllWindows().length === 0 && f();
});
a.on("exit-app", () => {
  s.quit(), t && t.kill();
});
a.handle("get-cwd", () => process.cwd());
a.on("open-tips", (r, i) => {
  const n = new d({
    width: 550,
    height: 220,
    webPreferences: {
      nodeIntegration: !0,
      contextIsolation: !1
    }
  });
  n.setMenu(null), n.title = "Tip of the Day", n.loadURL(`file://${e.join(R, "TipOfTheDay.html")}?text=${encodeURIComponent(i)}`);
});
a.handle("joinPath", (r, ...i) => e.join(...i));
a.handle("dirName", (r, i) => e.dirname(i));
s.whenReady().then(() => {
  P(), f();
});
export {
  R as MAIN_DIST,
  m as RENDERER_DIST,
  l as VITE_DEV_SERVER_URL
};

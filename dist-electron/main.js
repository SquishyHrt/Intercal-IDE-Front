import { app, BrowserWindow, ipcMain } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import "child_process";
import path from "node:path";
import "os";
createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    }
  });
  if (app.isPackaged) {
    win.setMenu(null);
  }
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
ipcMain.on("exit-app", () => {
  app.quit();
});
ipcMain.handle("get-cwd", () => {
  return process.cwd();
});
ipcMain.on("open-tips", (event, randomText) => {
  const newWindow = new BrowserWindow({
    width: 550,
    height: 220,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  newWindow.setMenu(null);
  newWindow.title = "Tip of the Day";
  newWindow.loadURL(`file://${path.join(MAIN_DIST, "TipOfTheDay.html")}?text=${encodeURIComponent(randomText)}`);
});
ipcMain.handle("joinPath", (event, ...args) => {
  return path.join(...args);
});
ipcMain.handle("dirName", (event, path2) => {
  return path.dirname(path2);
});
app.whenReady().then(() => {
  createWindow();
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};

import { app, BrowserWindow, ipcMain } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { spawn } from "child_process";
import path from "node:path";
import os from "os";
createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
let backendProcess = null;
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
function createBackend() {
  let backendRunnerFile = "ping-1.0-runner";
  if (os.platform() === "darwin" || os.arch() === "arm") {
    backendRunnerFile = "ping-1.0-runner-arm";
  }
  const backendRunnerPath = !app.isPackaged ? path.join(__dirname, "..", "src", "backend", backendRunnerFile) : path.join(process.resourcesPath, backendRunnerFile);
  backendProcess = spawn(backendRunnerPath);
  backendProcess.stdout.on("data", (data) => {
    console.log(`Backend stdout: ${data}`);
  });
  backendProcess.stderr.on("data", (data) => {
    console.error(`Backend stderr: ${data}`);
  });
  backendProcess.on("close", (code) => {
    console.log(`Backend process exited with code ${code}`);
  });
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
  if (backendProcess) {
    backendProcess.kill();
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
ipcMain.on("exit-app", () => {
  app.quit();
  if (backendProcess) {
    backendProcess.kill();
  }
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
app.whenReady().then(() => {
  createWindow();
  createBackend();
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};

"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args) {
    const [channel, listener] = args;
    return electron.ipcRenderer.on(channel, (event, ...args2) => listener(event, ...args2));
  },
  off(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.off(channel, ...omit);
  },
  send(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.invoke(channel, ...omit);
  }
});
electron.contextBridge.exposeInMainWorld("electron", {
  exitApp: () => electron.ipcRenderer.send("exit-app"),
  getCwd: async () => {
    return await electron.ipcRenderer.invoke("get-cwd");
  },
  openTips: (randomText) => electron.ipcRenderer.send("open-tips", randomText),
  // add other APIs you need here.
  joinPath: (...args) => electron.ipcRenderer.invoke("joinPath", ...args),
  dirName: (path) => electron.ipcRenderer.invoke("dirName", path)
});

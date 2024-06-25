import {ipcRenderer, contextBridge} from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
    on(...args: Parameters<typeof ipcRenderer.on>) {
        const [channel, listener] = args
        return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
    },
    off(...args: Parameters<typeof ipcRenderer.off>) {
        const [channel, ...omit] = args
        return ipcRenderer.off(channel, ...omit)
    },
    send(...args: Parameters<typeof ipcRenderer.send>) {
        const [channel, ...omit] = args
        return ipcRenderer.send(channel, ...omit)
    },
    invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
        const [channel, ...omit] = args
        return ipcRenderer.invoke(channel, ...omit)
    },
})

// Can't merge with the above contextBridge.exposeInMainWorld because not working
contextBridge.exposeInMainWorld('electron', {
    exitApp: () => ipcRenderer.send('exit-app'),
    getCwd: async () => {
        return await ipcRenderer.invoke('get-cwd');
    },
    // add other APIs you need here.
});
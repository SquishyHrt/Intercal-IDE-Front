import {app, BrowserWindow, ipcMain} from 'electron'
import {createRequire} from 'node:module'
import {fileURLToPath} from 'node:url'
import {spawn} from 'child_process'
import path from 'node:path'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))


// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null
let backendProcess: any = null;

function createWindow() {
    win = new BrowserWindow({
        icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.mjs'),
        },
    })

    // win.setMenu(null) enable this to hide the menu bar when release

    // Test active push message to Renderer-process.
    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', (new Date).toLocaleString())
    })

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(VITE_DEV_SERVER_URL)
    } else {
        // win.loadFile('dist/index.html')
        win.loadFile(path.join(RENDERER_DIST, 'index.html'))
    }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
        win = null
    }

    if (backendProcess) {
        backendProcess.kill();
    }
})

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

ipcMain.on('exit-app', () => {
    app.quit();
    if (backendProcess) {
        backendProcess.kill();
    }
})

ipcMain.handle('get-cwd', () => {
    return process.cwd();
})

ipcMain.on('open-tips', (event, randomText) => {
    const newWindow = new BrowserWindow({
        width: 550,
        height: 220,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    newWindow.setMenu(null);
    newWindow.title = 'Tip of the Day';
    newWindow.loadURL(`file://${path.join(MAIN_DIST, 'TipOfTheDay.html')}?text=${encodeURIComponent(randomText)}`);
});

app.whenReady().then(() => {
    createWindow();

    const backendRunnerPath = !app.isPackaged
        ? path.join(__dirname, '..', 'src', 'backend', 'ping-1.0-runner')
        : path.join(process.resourcesPath, 'ping-1.0-runner');

    backendProcess = spawn(backendRunnerPath);

    backendProcess.stdout.on('data', (data: Buffer) => {
        console.log(`Backend stdout: ${data}`);
    });

    backendProcess.stderr.on('data', (data: Buffer) => {
        console.error(`Backend stderr: ${data}`);
    });

    backendProcess.on('close', (code: number) => {
        console.log(`Backend process exited with code ${code}`);
    });
});
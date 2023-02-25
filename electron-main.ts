import { BrowserWindow } from 'electron';

export default class Main {
  static mainWindow: Electron.BrowserWindow;
  static application: Electron.App;
  static BrowserWindow: any;
  private static onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      Main.application.quit();
    }
  }

  private static onClose() {
    // Dereference the window object.
    Main.mainWindow.destroy();
  }

  private static onReady() {
    console.log('working directory:', __dirname);
    Main.mainWindow = new Main.BrowserWindow({ width: 800, height: 600 });
    Main.mainWindow.loadURL('file://' + __dirname + '/diet-manager/index.html');
    Main.mainWindow.on('closed', Main.onClose);
    // Open the DevTools.
    Main.mainWindow.webContents.openDevTools();
  }

  static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
    // we pass the Electron.App object and the
    // Electron.BrowserWindow into this function
    // so this class has no dependencies. This
    // makes the code easier to write tests for
    Main.BrowserWindow = browserWindow;
    Main.application = app;
    Main.application.on('window-all-closed', Main.onWindowAllClosed);
    Main.application.on('ready', Main.onReady);

    // try {
    //   require('electron-reloader')(module);
    // } catch (_) {}
  }
}

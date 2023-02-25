import { BrowserWindow } from 'electron';
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

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

    dotenv.config();

    const server: Express = express();
    const port = process.env['PORT'];

    server.get('/', (req: Request, res: Response) => {
      res.send('Express + TypeScript Server');
    });

    server.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  }
}

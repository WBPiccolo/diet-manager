import { app, BrowserWindow } from 'electron';
import Main from './electron-main';
import Server from './electron-express';

Main.main(app, BrowserWindow);
Server.startServer();

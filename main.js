const { app, BrowserWindow, dialog, ipcMain, screen } = require('electron');
const path = require('path');
const url = require('url');
const { WindowService } = require('./electron/window-service.js');

const IS_DEBUG = 0;
const IS_DEBUG_WIDTH = IS_DEBUG ? 1000 : 0;
const IS_DEBUG_HEIGHT = IS_DEBUG ? 800 : 0;

const WINDOW_WIDTH = IS_DEBUG_WIDTH || 240;
const WINDOW_HEIGHT = IS_DEBUG_HEIGHT || 185;
const MARGIN_RIGHT = 50;
// const MARGIN_BOTTOM = 20;
const MARGIN_TOP = 150;
const IS_MACOS = process.platform === 'darwin';

const windowService = new WindowService();
let mainWindow;

function createMainWindow() {
	const { width, height } = screen.getPrimaryDisplay().workAreaSize;

	mainWindow = new BrowserWindow({
		title: 'Timer desktop',
		width: WINDOW_WIDTH,
		height: WINDOW_HEIGHT,
		x: width - WINDOW_WIDTH - MARGIN_RIGHT,
		y: MARGIN_TOP,
		// y: height - WINDOW_HEIGHT - MARGIN_BOTTOM,
		frame: false,
		transparent: true,
		alwaysOnTop: true,
		webPreferences: {
			webSecurity: false,
			nodeIntegration: true,
			contextIsolation: true,
			preload: path.join(__dirname, 'electron', 'preload.js'),
		},
	});

	IS_DEBUG && mainWindow.webContents.openDevTools();

	const startUrl = url.format({
		pathname: path.join(__dirname, './app/build/index.html'),
		protocol: 'file:',
		// slashes: true,
	});
	mainWindow.loadURL(startUrl);
	// mainWindow.loadURL("http://localhost:3000");

	mainWindow.on('closed', () => {
		mainWindow = null;
	});

	// dialog.showMessageBox({
	// 	type: "info",
	// 	title: "Platform Information",
	// 	message: `You are running on macOS (process.platform: ${process.platform})`,
	// });

	if (IS_MACOS) {
		mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

		app.on('browser-window-blur', () => {
			mainWindow.setVisibleOnAllWorkspaces(false);
		});

		app.on('browser-window-focus', () => {
			mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
		});
	}

	windowService.addCloseWindowListener();
	windowService.addWindowMoveListener(mainWindow);
}

app.on('ready', createMainWindow);

app.on('window-all-closed', () => {
	app.quit();
});

// app.on("activate", () => {
// 	if (BrowserWindow.getAllWindows().length === 0) {
// 		createMainWindow();
// 	}
// });

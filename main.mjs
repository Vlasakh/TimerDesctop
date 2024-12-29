import { app, BrowserWindow, dialog, screen } from "electron";
// import { WindowManager } from "electron-window-manager";
import path from "path";
import url, { fileURLToPath } from "url";

import { WindowService } from "./electron/window-service.mjs";

const WINDOW_WIDTH = 240;
const WINDOW_HEIGHT = 185;
const MARGIN_RIGHT = 50;
const MARGIN_BOTTOM = 20;
const IS_MACOS = process.platform === "darwin";

const windowService = new WindowService();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let mainWindow;

function createMainWindow() {
	const { width, height } = screen.getPrimaryDisplay().workAreaSize;

	mainWindow = new BrowserWindow({
		title: "Timer desktop",
		width: WINDOW_WIDTH,
		height: WINDOW_HEIGHT,
		x: width - WINDOW_WIDTH - MARGIN_RIGHT,
		y: height - WINDOW_HEIGHT - MARGIN_BOTTOM,
		frame: false,
		transparent: true,
		alwaysOnTop: true, // This line makes the window stay above all other windows
		webPreferences: {
			webSecurity: false,
			// nodeIntegration: true,
			// contextIsolation: false,
			preload: path.join(__dirname, "electron", "preload.mjs"),
		},
	});

	// mainWindow.webContents.openDevTools();

	const startUrl = url.format({
		pathname: path.join(__dirname, "./app/build/index.html"),
		protocol: "file:",
		slashes: true,
	});
	// mainWindow.loadURL(startUrl);
	mainWindow.loadURL("http://localhost:3000");

	mainWindow.on("closed", () => {
		mainWindow = null;
	});

	// dialog.showMessageBox({
	// 	type: "info",
	// 	title: "Platform Information",
	// 	message: `You are running on macOS (process.platform: ${process.platform})`,
	// });

	// if (process.platform === "darwin") {
	// 	const windowManager = new WindowManager();
	// 	windowManager.add(mainWindow, "mainWindow", "Timer desktop", "http://localhost:3000", {
	// 		alwaysOnTop: true,
	// 		visibleOnAllWorkspaces: true,
	// 	});
	//
	// 	windowManager.on("workspace-changed", () => {
	// 		if (mainWindow) {
	// 			mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
	// 			mainWindow.setVisibleOnAllWorkspaces(false);
	// 		}
	// 	});
	// }

	windowService.addWindowMoveListener(mainWindow);
}

app.on("ready", createMainWindow);

app.on("window-all-closed", () => {
	if (!IS_MACOS) {
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createMainWindow();
	}
});

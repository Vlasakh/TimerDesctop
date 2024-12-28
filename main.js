const { app, BrowserWindow, ipcMain, screen } = require("electron");
const path = require("path");
const url = require("url");

const WINDOW_WIDTH = 240;
const WINDOW_HEIGHT = 185;
const MARGIN_RIGHT = 50;
const MARGIN_BOTTOM = 20;

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
		webPreferences: {
			webSecurity: false,
			// nodeIntegration: true,
			// contextIsolation: false,
			preload: path.join(__dirname, "preload.js"),
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
}

app.on("ready", createMainWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createMainWindow();
	}
});

ipcMain.on("move-window", (event, { deltaX, deltaY }) => {
	if (mainWindow) {
		const [x, y] = mainWindow.getPosition();
		mainWindow.setPosition(x + deltaX, y + deltaY);
	}
});

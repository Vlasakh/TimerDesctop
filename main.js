const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

function createMainWindow() {
	let mainWindow = new BrowserWindow({
		title: "Timer desktop",
		width: 1000,
		height: 800,
		frame: false,
		transparent: true,
		webPreferences: {
			webSecurity: false,
			nodeIntegration: true,
			contextIsolation: false,
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

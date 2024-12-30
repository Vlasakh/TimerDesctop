const { contextBridge, ipcRenderer } = require("electron");
const path = require("path");
const { WindowService } = require(path.join(__dirname, "window-service"));

const windowService = new WindowService();

contextBridge.exposeInMainWorld("electron", {
	windowControl: {
		moveWindow: (deltaX, deltaY) => windowService.windowControlMoveWindow({ deltaX, deltaY }),
		close: () => windowService.windowControlClose(),
	},
});

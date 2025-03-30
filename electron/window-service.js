const { ipcMain, BrowserWindow, ipcRenderer } = require('electron');
const { dialog } = require('electron');

const CLOSE_WINDOW_MESSAGE = 'close-window';
let MOVE_WINDOW_MESSAGE = 'move-window';

class WindowService {
	addWindowMoveListener(mainWindow) {
		ipcMain.on(MOVE_WINDOW_MESSAGE, (event, { deltaX, deltaY }) => {
			if (mainWindow) {
				const [x, y] = mainWindow.getPosition();
				mainWindow?.setPosition(x + deltaX, y + deltaY);
			}
		});
	}

	addCloseWindowListener() {
		ipcMain.on(CLOSE_WINDOW_MESSAGE, (event) => {
			dialog.showMessageBox({
				type: 'info',
				title: 'Exit',
				message: `Press OK to exit`,
			});
			const window = BrowserWindow.getFocusedWindow();
			if (window) {
				window.close();
			}
		});
	}

	windowControlClose() {
		ipcRenderer.send(CLOSE_WINDOW_MESSAGE);
	}
	windowControlMoveWindow({ deltaX, deltaY }) {
		ipcRenderer.send(MOVE_WINDOW_MESSAGE, { deltaX, deltaY });
	}
}

module.exports = { WindowService };

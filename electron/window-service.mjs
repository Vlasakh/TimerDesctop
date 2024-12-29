import { ipcMain } from "electron";

export class WindowService {
	addWindowMoveListener(mainWindow) {
		ipcMain.on("move-window", (event, { deltaX, deltaY }) => {
			if (mainWindow) {
				const [x, y] = mainWindow.getPosition();
				mainWindow.setPosition(x + deltaX, y + deltaY);
			}
		});
	}
}

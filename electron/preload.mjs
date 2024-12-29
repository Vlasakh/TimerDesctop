import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
	moveWindow: (deltaX, deltaY) => ipcRenderer.send("move-window", { deltaX, deltaY }),
});

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
	moveWindow: (deltaX, deltaY) => {
		// console.log("❗deltaX");
		// dialog.showMessageBox({
		// 	type: "info",
		// 	title: "Platform Information",
		// 	message: `deltaX, deltaY ` + deltaX + " " + deltaY,
		// });
		console.log("❗here");

		ipcRenderer.send("move-window", { deltaX, deltaY });
	},
});

// window.electron = {
// 	windowControl: {
// 		close: () => ipcRenderer.send("close-window"),
// 	},
// };

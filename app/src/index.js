import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App";
import "./index.css";

// alert("works");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);

let isDragging = false;
let startX, startY;

try {
	document.addEventListener("mousedown", (e) => {
		isDragging = true;
		startX = e.clientX;
		startY = e.clientY;
	});

	document.addEventListener("mousemove", (e) => {
		if (isDragging) {
			window.electron.moveWindow(e.clientX - startX, e.clientY - startY);
		}
	});

	document.addEventListener("mouseup", () => {
		isDragging = false;
	});
} catch (e) {
	console.error(e.message);
}

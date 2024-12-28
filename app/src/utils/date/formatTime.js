export function formatTime(seconds) {
	const date = new Date(seconds * 1000);
	const hh = date.getUTCHours();
	const mm = date.getUTCMinutes();
	const ss = String(date.getUTCSeconds()).padStart(2, "0");

	if (hh > 0) {
		return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${ss}`;
	} else if (mm > 0) {
		return `${String(mm).padStart(2, "0")}:${ss}`;
	} else {
		return `${ss}`;
	}
}

const FORMAT = {
	h: "h",
	m: "m",
	s: "s",
};

export function formatTime(seconds, format = FORMAT.s) {
	const date = new Date(seconds * 1000);
	const hh = date.getUTCHours();
	const mm = date.getUTCMinutes();
	const ss = String(date.getUTCSeconds()).padStart(2, "0");

	if (hh > 0 || format === FORMAT.h) {
		return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${ss}`;
	} else if (mm > 0 || format === FORMAT.m) {
		return `${String(mm).padStart(2, "0")}:${ss}`;
	} else {
		return `${ss}`;
	}
}

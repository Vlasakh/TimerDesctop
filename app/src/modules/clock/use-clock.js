import { useEffect, useRef, useState } from "react";

export function useClock(initialTimeInSeconds = 60) {
	const [currentTime, setCurrentTime] = useState(initialTimeInSeconds);
	const [isRunning, setIsRunning] = useState(false);
	const [isTimeOut, setIsTimeOut] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const timerRef = useRef(null);

	function handleStart() {
		if (isRunning) return;

		setIsRunning(true);
		setIsPaused(false);
		setIsTimeOut(false);
		timerRef.current = setInterval(() => {
			setCurrentTime((prevTime) => {
				if (prevTime <= 1) {
					clearInterval(timerRef.current);
					setIsRunning(false);
					setIsTimeOut(true);
					return 0;
				}
				return prevTime - 1;
			});
		}, 1000);

		console.log("Clock started");
	}

	function handlePause() {
		if (!isRunning) return;

		clearInterval(timerRef.current);
		setIsRunning(false);
		setIsPaused(true);
		console.log("Clock paused");
	}

	function handleReset() {
		clearInterval(timerRef.current);
		setCurrentTime(initialTimeInSeconds);
		setIsRunning(false);
		setIsTimeOut(false);
		setIsPaused(false);
		console.log("Clock reseted");
	}

	useEffect(() => {
		return () => clearInterval(timerRef.current);
	}, []);

	return {
		onStart: handleStart,
		onPause: handlePause,
		onReset: handleReset,
		currentTime,
		isRunning,
		isTimeOut,
		isPaused,
	};
}

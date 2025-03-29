import { useEffect, useRef, useState } from 'react';

// const DEF_TIME = 60;
// const DEF_POST_TIMER_DURATION = 300;
const DEF_TIME = 5;
const DEF_POST_TIMER_DURATION = 5;

export function useClock(initialTimeInSeconds = DEF_TIME, postTimerDurationInSeconds = DEF_POST_TIMER_DURATION) {
	const [currentTime, setCurrentTime] = useState(DEF_TIME);
	const [isRunning, setIsRunning] = useState(false);
	const timeoutRef = useRef(null);

	useEffect(() => {
		if (isRunning) {
			if (currentTime > 0) {
				timeoutRef.current = setTimeout(() => {
					setCurrentTime(currentTime - 1);
				}, 1000);
			} else {
				setIsRunning(false);
				setCurrentTime(DEF_TIME);
			}
		}
		return () => clearTimeout(timeoutRef.current);
	}, [isRunning, currentTime]);

	const handleStartPauseToggle = () => {
		setIsRunning(!isRunning);
	};

	const handleReset = () => {
		setIsRunning(false);
		setCurrentTime(DEF_TIME);
		clearTimeout(timeoutRef.current);
	};

	return {
		onStartPauseToggle: handleStartPauseToggle,
		onReset: handleReset,
		currentTime,
		isRunning,
	};
}

import { useEffect, useRef, useState } from 'react';

import { IS_DEBUG } from '../../constants';

const DEF_TIME = IS_DEBUG ? 5 : 60;
const DEF_POST_TIMER_DURATION = IS_DEBUG ? 5 : 300;

export function useClock(initialTime = DEF_TIME, initialPostTime = DEF_POST_TIMER_DURATION) {
	const [currentTime, setCurrentTime] = useState(DEF_TIME);
	const [isRunning, setIsRunning] = useState(false);
	const timeoutRef = useRef(null);

	const [postTimer, setPostTimer] = useState(0);
	const [isPostTimerRunning, setIsPostTimerRunning] = useState(false);
	const postTimerRef = useRef(null);

	const isPaused = !isRunning && currentTime !== initialTime;

	useEffect(() => {
		if (isRunning) {
			if (currentTime > 0) {
				timeoutRef.current = setTimeout(() => {
					setCurrentTime(currentTime - 1);
				}, 1000);
			} else {
				setIsRunning(false);
				setCurrentTime(DEF_TIME);
				setIsPostTimerRunning(true); // Start post timer
			}
		}
		return () => clearTimeout(timeoutRef.current);
	}, [isRunning, currentTime]);

	useEffect(() => {
		if (isPostTimerRunning) {
			if (postTimer < initialPostTime) {
				postTimerRef.current = setTimeout(() => {
					setPostTimer(postTimer + 1);
				}, 1000);
			} else {
				setIsPostTimerRunning(false);
				setPostTimer(0);
			}
		}
		return () => clearTimeout(postTimerRef.current);
	}, [isPostTimerRunning, postTimer]);

	const handleStartPauseToggle = () => {
		setIsRunning(!isRunning);
		if (isPostTimerRunning) {
			setIsPostTimerRunning(false);
			setPostTimer(0);
		}
	};

	const handleReset = () => {
		setIsRunning(false);
		setCurrentTime(DEF_TIME);
		clearTimeout(timeoutRef.current);
		setIsPostTimerRunning(false); // Reset post timer state
		setPostTimer(0); // Reset post timer count
	};

	const handleStopPostTimer = () => {
		setIsPostTimerRunning(false);
		setPostTimer(0);
	};

	return {
		onStartPauseToggle: handleStartPauseToggle,
		onReset: handleReset,
		onStopPostTimer: handleStopPostTimer,
		currentTime,
		postTimer,
		isRunning,
		isPaused,
		isPostTimerRunning,
	};
}

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PauseIcon from "@mui/icons-material/Pause";
import PlayIcon from "@mui/icons-material/PlayArrow";
import RestoreIcon from "@mui/icons-material/Restore";

import { IconButton } from "../../atoms/IconButton/IconButton";
import { formatTime } from "../../utils/date/formatTime";
import styles from "./Clock.module.scss";
import { useClock } from "./use-clock";

export function Clock() {
	const { onStart, currentTime, isRunning, onPause, onReset, isPaused } = useClock();

	return (
		<div className={styles.container}>
			<div className={styles.item1}></div>
			<div className={styles.goBack}>
				<div>
					<IconButton icon={ArrowBackIcon} onClick={() => {}} />
				</div>
			</div>
			<div className={styles.clock}>
				<div>
					{formatTime(currentTime)
						.split("")
						.map((num) => (
							<div className={num === ":" ? styles.colon : styles.digit}>{num}</div>
						))}
				</div>
			</div>
			<div className={styles.reset}>
				<div>
					{!isRunning && !isPaused && <IconButton icon={PlayIcon} onClick={onStart} />}
					{(isRunning || isPaused) && <IconButton icon={RestoreIcon} onClick={onReset} />}
				</div>
			</div>
			<div className={styles.pause}>
				<div>
					{isRunning && <IconButton icon={PauseIcon} onClick={onPause} />}
					{isPaused && <IconButton icon={PlayIcon} onClick={onStart} />}
					{!isRunning && !isPaused && <IconButton icon={PlayIcon} onClick={onStart} />}
				</div>
			</div>
		</div>
	);
}

import cx from 'clsx';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import PauseIcon from '@mui/icons-material/Pause';
import PlayIcon from '@mui/icons-material/PlayArrow';
import RestoreIcon from '@mui/icons-material/Restore';

import { IconButton } from '../../atoms/IconButton/IconButton';
import { formatTime } from '../../utils/date/formatTime';
import styles from './Clock.module.scss';
import { useClock } from './use-clock';

export function Clock() {
	const { onStart, currentTime, isRunning, onStartPauseToggle, onReset, isPaused, postTimerTime, postTimerRunning } =
		useClock();

	const handleClose = () => {
		window.electron?.windowControl?.close();
	};

	return (
		<div className={styles.container}>
			<div className={styles.row}>
				<div className={styles.close}>
					<IconButton icon={CloseIcon} onClick={handleClose} />
				</div>
				<div>AA</div>
				<div className={styles.goBack}>
					<div>
						<IconButton icon={ArrowBackIcon} onClick={() => {}} />
					</div>
				</div>
			</div>
			<div className={cx(styles.row, styles.clockRow)}>
				<div className={styles.clock}>
					<div>
						{formatTime(currentTime)
							.split('')
							.map((num) => (
								<div className={num === ':' ? styles.colon : styles.digit}>{num}</div>
							))}
					</div>
				</div>
				<div className={styles.rounds}>cell 2/2</div>
			</div>
			<div className={styles.row}>
				<div className={styles.reset}>
					<div>
						{!isRunning && <IconButton icon={PlayIcon} onClick={onStartPauseToggle} />}
						{isRunning && <IconButton icon={RestoreIcon} onClick={onReset} />}
					</div>
				</div>
				<div>{postTimerRunning && formatTime(postTimerTime, 'm')}</div>
				<div className={styles.pause}>
					<div>
						{isRunning && <IconButton icon={PauseIcon} onClick={onStartPauseToggle} />}
						{!isRunning && <IconButton icon={PlayIcon} onClick={onStartPauseToggle} />}
						{/*{!isRunning && !isPaused && <IconButton icon={PlayIcon} onClick={onStart} />}*/}
					</div>
				</div>
			</div>
		</div>
	);
}

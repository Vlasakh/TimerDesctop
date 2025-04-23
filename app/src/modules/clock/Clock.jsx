import cx from 'clsx';

import PlusIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import PauseIcon from '@mui/icons-material/Pause';
import PlayIcon from '@mui/icons-material/PlayArrow';
import MinusIcon from '@mui/icons-material/Remove';
import StopIcon from '@mui/icons-material/Stop';

import { IconButton } from '../../atoms/IconButton/IconButton';
import { formatTime } from '../../utils/date/formatTime';
import styles from './Clock.module.scss';
import { useClock } from './use-clock';
import { useRoundsCounter } from './use-rounds-counter';

export function Clock() {
	const {
		currentTime,
		postTimer,
		isRunning,
		isPaused,
		isPostTimerRunning,
		onStartPauseToggle,
		onReset,
		onStopPostTimer,
	} = useClock();
	const { rounds, onDecrement, onRoundsReset, onIncrement } = useRoundsCounter();

	const handleClose = () => {
		window.electron?.windowControl?.close();
	};

	const handlePlay = () => {
		onStartPauseToggle();
		onIncrement();
	};

	return (
		<div className={styles.container}>
			<div className={styles.row}>
				<div className={styles.close}>
					<IconButton icon={CloseIcon} onClick={handleClose} />
				</div>
				<div className={styles.hiddenContent}>AAA</div>
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
				<div className={styles.rounds}>
					<IconButton className={styles.rounds__roundsBtn} icon={PlusIcon} onClick={onIncrement} />
					<div onClick={onRoundsReset}>
						<span>{rounds}</span>
					</div>
					<IconButton className={styles.rounds__roundsBtn} icon={MinusIcon} onClick={onDecrement} />
				</div>
			</div>
			<div className={cx(styles.row, styles.lastRow)}>
				<div className={styles.timerBtns}>
					{!isRunning && !isPostTimerRunning && !isPaused && (
						<IconButton className={styles.timerBtns__widePlayBtn} icon={PlayIcon} onClick={handlePlay} />
					)}
					<div>
						{!isRunning && isPostTimerRunning && <IconButton icon={PlayIcon} onClick={handlePlay} />}
						{(isRunning || isPaused) && <IconButton icon={StopIcon} onClick={onReset} />}
					</div>
					<div>
						{isRunning && <IconButton icon={PauseIcon} onClick={onStartPauseToggle} />}
						{isPaused && <IconButton icon={PlayIcon} onClick={onStartPauseToggle} />}
						{isPostTimerRunning && <IconButton icon={StopIcon} onClick={onStopPostTimer} />}
					</div>
				</div>
				<div className={styles.pause}></div>
				<div className={styles.postTimer}>
					{isPostTimerRunning && (
						<div>
							-<span>{formatTime(postTimer, 'm')}</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

import cx from 'clsx';

import PlusIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import PauseIcon from '@mui/icons-material/Pause';
import PlayIcon from '@mui/icons-material/PlayArrow';
import MinusIcon from '@mui/icons-material/Remove';
import RestoreIcon from '@mui/icons-material/Restore';
import StopIcon from '@mui/icons-material/Stop';

import { IconButton } from '../../atoms/IconButton/IconButton';
import { formatTime } from '../../utils/date/formatTime';
import styles from './Clock.module.scss';
import { useClock } from './use-clock';
import { useRoundsCounter } from './use-rounds-counter';

export function Clock() {
	const { currentTime, postTimer, isRunning, isPostTimerRunning, onStartPauseToggle, onReset, onStopPostTimer } =
		useClock();
	const { rounds, onDecrement, onRoundsReset, onIncrement } = useRoundsCounter();

	const handleClose = () => {
		window.electron?.windowControl?.close();
	};

	return (
		<div className={styles.container}>
			<div className={styles.row}>
				<div className={styles.close}>
					<IconButton icon={CloseIcon} onClick={handleClose} />
				</div>
				<div className={styles.hiddenContent}>AA</div>
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
					<div onClick={onRoundsReset}>{rounds}</div>
					<IconButton className={styles.rounds__roundsBtn} icon={MinusIcon} onClick={onDecrement} />
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.reset}>
					<div>
						{!isRunning && <IconButton icon={PlayIcon} onClick={onStartPauseToggle} />}
						{isRunning && <IconButton icon={RestoreIcon} onClick={onReset} />}
					</div>
				</div>
				<div className={styles.postTimer}>
					{isPostTimerRunning && (
						<>
							-<span>{formatTime(postTimer, 'm')}</span>
						</>
					)}
				</div>
				<div className={styles.pause}>
					<div>
						{isRunning && <IconButton icon={PauseIcon} onClick={onStartPauseToggle} />}
						{!isRunning && !isPostTimerRunning && <IconButton icon={PlayIcon} onClick={onStartPauseToggle} />}
						{isPostTimerRunning && <IconButton icon={StopIcon} onClick={onStopPostTimer} />}
					</div>
				</div>
			</div>
		</div>
	);
}

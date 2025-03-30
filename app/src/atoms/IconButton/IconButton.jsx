import cx from 'clsx';

import Button from '@mui/material/Button';

import styles from './IconButton.module.scss';

export function IconButton({ icon: Icon, onClick, text = '', className }) {
	return (
		<Button
			className={cx(styles.iconButton, styles.button, className)}
			variant="contained"
			startIcon={Icon && <Icon />}
			onClick={onClick}
		>
			{text}
		</Button>
	);
}

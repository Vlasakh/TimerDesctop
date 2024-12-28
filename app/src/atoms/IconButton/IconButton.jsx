import cx from "clsx";

import Button from "@mui/material/Button";

import styles from "./IconButton.module.scss";

export function IconButton({ icon: Icon, onClick }) {
	return (
		<Button
			className={cx(styles.iconButton, styles.button)}
			variant="contained"
			startIcon={<Icon />}
			onClick={onClick}
		/>
	);
}

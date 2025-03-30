import { useCallback, useState } from 'react';

export const useRoundsCounter = () => {
	const [rounds, setRounds] = useState(0);

	const handleIncrement = useCallback(() => {
		setRounds((prevRounds) => prevRounds + 1);
	}, []);

	const handleDecrement = useCallback(() => {
		setRounds((prevRounds) => prevRounds - 1);
	}, []);

	const handleReset = useCallback(() => {
		setRounds(0);
	}, []);

	return {
		rounds,
		onIncrement: handleIncrement,
		onDecrement: handleDecrement,
		onRoundsReset: handleReset,
	};
};

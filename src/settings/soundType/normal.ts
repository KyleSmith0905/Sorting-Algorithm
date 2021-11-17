export const name = 'Normal';
export const algorithm = (data: number, oscillator: OscillatorNode): void => {
	if (isFinite(data) === false) return;
	oscillator.frequency.value = data * 1100 + 50;
};

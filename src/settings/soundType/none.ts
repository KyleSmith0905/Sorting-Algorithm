export const name = 'None';
export const algorithm = (_: number, oscillator: OscillatorNode) => {
	oscillator.frequency.value = 0;
};
export const soundNone = (_: number, oscillator: OscillatorNode) => {
	oscillator.frequency.value = 0;
};

export const soundDefault = (data: number, oscillator: OscillatorNode): void => {
	if (isFinite(data) === false) return;
	oscillator.frequency.value = data * 1100 + 50;
}
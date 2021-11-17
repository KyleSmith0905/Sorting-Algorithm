export const name = 'Random';
export const algorithm = (_: number[], __: number, totalLength: number): [number, number] => {
	const value = Math.random() * totalLength;
	return [Number.NaN, value];
};
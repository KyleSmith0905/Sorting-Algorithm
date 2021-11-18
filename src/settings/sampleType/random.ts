export const name = 'Random';
export const algorithm = (index: number, totalLength: number): number => {
	const value = Math.random() * totalLength;
	return value;
};
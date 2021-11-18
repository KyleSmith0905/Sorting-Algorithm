export const name = 'Logarithmic';
export const algorithm = (index: number, totalLength: number): number => {
	const value = Math.log2(index);
	return value;
};
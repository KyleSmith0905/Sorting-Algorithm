export const name = 'Constant';
export const algorithm = (index: number, totalLength: number): number => {
	const sectionLength = Math.sqrt(totalLength);
	const value = Math.floor(index / sectionLength);
	return value;
};
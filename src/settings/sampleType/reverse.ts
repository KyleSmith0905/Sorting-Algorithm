export const name = 'Reverse';
export const algorithm = (_: number[], index: number, totalLength: number): [number, number] => {
	return [totalLength - index, totalLength - index];
};
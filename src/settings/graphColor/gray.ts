export const name = 'Gray';
export const color = (index: number, totalArray: number) => {
	const grayHex = Math.floor((index / totalArray) * 255).toString(16).padStart(2, '0');
	return '#' + grayHex + grayHex + grayHex;
};

export const highlightColor = () => {
	return '#ff0000';
};
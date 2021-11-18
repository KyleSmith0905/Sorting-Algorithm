export const name = 'Gray';
export const color = (totalLength: number, startPosition: number, endPosition: number) => {
	const grayHex = Math.floor((endPosition / totalLength) * 255).toString(16).padStart(2, '0');
	return '#' + grayHex + grayHex + grayHex;
};

export const highlightColor = () => {
	return '#ff0000';
};
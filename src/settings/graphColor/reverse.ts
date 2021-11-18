import { sineHSVToHex } from './_shared';

export const name = 'Reverse';
export const color = (totalLength: number, startPosition: number, endPosition: number) => {
	return sineHSVToHex((startPosition / totalLength) * 360, 100, 100);
};
export const highlightColor = () => {
	return '#ffffff';
};
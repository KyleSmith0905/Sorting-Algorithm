import { sineHSVToHex } from './_shared';

export const name = 'Rainbow';
export const color = (totalLength: number, startPosition: number, endPosition: number) => {
	return sineHSVToHex((endPosition / totalLength) * 360, 100, 100);
};
export const highlightColor = () => {
	return '#ffffff';
};
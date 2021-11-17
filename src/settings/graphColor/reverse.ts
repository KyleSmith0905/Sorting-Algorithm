import { sineHSVToHex } from './_shared';

export const name = 'Reverse';
export const color = (_: number, totalArray: number, position: number) => {
	return sineHSVToHex((position / totalArray) * 360, 100, 100);
};
export const highlightColor = () => {
	return '#ffffff';
};
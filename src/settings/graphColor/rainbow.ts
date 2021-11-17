import { sineHSVToHex } from './_shared';

export const name = 'Rainbow';
export const color = (index: number, totalArray: number) => {
	return sineHSVToHex((index / totalArray) * 360, 100, 100);
};
export const highlightColor = () => {
	return '#ffffff';
};
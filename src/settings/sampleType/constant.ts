import { getRandomNumber } from './_shared';

export const name = 'Constant';
export const algorithm = (_: number[], __: number): [number, number] => {
	const value = getRandomNumber([0, 1, 2, 3, 4]);
	return [Number.NaN, value];
};
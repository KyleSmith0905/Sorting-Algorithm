import { getRandomNumber } from './_shared';

export const name = 'Exponential';
export const algorithm = (numbers: number[]): [number, number] => {
	const randomNumber = getRandomNumber(numbers);
	return [randomNumber, randomNumber ** 2.5];
};
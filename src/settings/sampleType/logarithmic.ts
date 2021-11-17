import { getRandomNumber } from './_shared';

export const name = 'Logarithmic';
export const algorithm = (numbers: number[]): [number, number] => {
	const randomNumber = getRandomNumber(numbers);
	return [randomNumber, Math.log(randomNumber + 1)];
};
import { getRandomNumber } from './_shared';

export const name = 'Linear';
export const algorithm = (numbers: number[]): [number, number] => {
	const randomNumber = getRandomNumber(numbers);
	return [randomNumber, randomNumber];
};
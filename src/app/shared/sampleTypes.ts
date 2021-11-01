// First return - Position of data
// Second return - Value of data

export const linearData = (numbers: number[]): [number, number] => {
	const randomNumber = getRandomNumber(numbers);
	return [randomNumber, randomNumber];
}

export const exponentialData = (numbers: number[]): [number, number] => {
	let randomNumber = getRandomNumber(numbers);
	return [randomNumber, randomNumber ** 2.5];
}

export const logarithmicData = (numbers: number[]): [number, number] => {
	const randomNumber = getRandomNumber(numbers);
	return [randomNumber, Math.log(randomNumber + 1)];
}

export const randomData = (_: number[], __: number, totalLength: number): [number, number] => {
	const value = Math.random() * totalLength;
	return [Number.NaN, value]
}

export const constantData = (_: number[], index: number): [number, number] => {
	return [index, 1];
}

export const reverseData = (_: number[], index: number, totalLength: number): [number, number] => {
	return [totalLength - index, totalLength - index];
}

const getRandomNumber = (numbers: number[]) => {
	return numbers[Math.floor(Math.random() * numbers.length)]
}
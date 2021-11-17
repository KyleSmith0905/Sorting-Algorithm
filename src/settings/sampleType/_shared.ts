export const getRandomNumber = (numbers: number[]) => {
	return numbers[Math.floor(Math.random() * numbers.length)];
};
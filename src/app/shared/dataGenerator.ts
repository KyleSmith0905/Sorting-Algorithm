export interface IDataPoint {
	color: string;
	height: number;
	data: number;
}

export const DataGenerator = (totalPoints: number): Array<IDataPoint> => {
	let numbers = [];
  let results: Array<IDataPoint> = [];

	for (let i = 0; i <= totalPoints - 1; i++) {
		numbers.push(i);
	}

	while (numbers.length > 0) {
		let randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
		numbers.splice(numbers.indexOf(randomNumber), 1);
		results.push({
			color: sineHSVToHex((randomNumber / totalPoints) * 360, 100, 100),
			height: (100 * (randomNumber)) / (totalPoints - 1),
			data: randomNumber,
		});
	};
	return results;
}

export const sineHSVToHex = (hue: number, saturation: number, value: number): string => {
	
	const hueTransform = (-Math.PI * (hue % 360)) / 180 + Math.PI;
	const saturationScalar = saturation * (128/100);
	const saturationTransform = saturation * (-128 / 100) + 256;
	const valueScalar = value / 100;

	const HSVtoElement = (offset: number): number => {
		let element = Math.floor((Math.sin(hueTransform + (Math.PI * offset)) * saturationScalar + saturationTransform) * valueScalar);
		if (element > 255) element = 255;
		else if (element < 0) element = 0;
		return element;
	}

	const elementToHex = (element: number): string => {
		return Math.floor(element).toString(16).padStart(2, '0');
	}
	
	const r = HSVtoElement(3/2);
	const g = HSVtoElement(1/6);
	const b = HSVtoElement(5/6);


	return '#' + elementToHex(r) + elementToHex(g) + elementToHex(b);
}
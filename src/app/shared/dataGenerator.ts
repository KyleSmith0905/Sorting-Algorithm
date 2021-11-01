import { IDataPoint } from "./constants";

export const DataGenerator = (totalPoints: number, colorFunction: (index: number, totalArray: number, position: number) => string, sampleTypeFunction: (numbers: number[], index: number, totalLength: number) => [number, number]): Array<IDataPoint> => {

	let numbers: number[] = Array.from(Array(totalPoints).keys())	;
  const results: Array<IDataPoint> = [];
	let topDataPoint = 0;
	let extraRandom = false;

	while (numbers.length > 0) {

		const [dataPosition, dataValue] = sampleTypeFunction(numbers,  totalPoints - numbers.length, totalPoints);

		numbers.splice(numbers.indexOf(dataPosition), 1);

		results.push({
			height: 0,
			data: dataValue,
			color: Number.isNaN(dataPosition) ? '#ff4040' : colorFunction(dataPosition, totalPoints, results.length),
			id: dataPosition
		});
		if (topDataPoint < dataValue) topDataPoint = dataValue;
		if (Number.isNaN(dataPosition)) extraRandom = true;
	}

	if (extraRandom === true) {
		results.sort((a, b) => a.data - b.data);
		let resultsLength = results.length;

		for (let i = 0; i < resultsLength; i++) {
			results[i].color = colorFunction(i, totalPoints, 1);
			results[i].id = i;
		}

		for (let i = resultsLength - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[results[i], results[j]] = [results[j], results[i]]
		}
	}

	for (let i = 0; i < results.length; i++) {
		const currentResult = results[i];
		currentResult.height = (100 * currentResult.data) / topDataPoint;
	}

	return results;
}
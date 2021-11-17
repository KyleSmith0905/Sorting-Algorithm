import { graphColors, sampleTypes, settings } from 'src/settings';
import { IDataPoint } from './interfaces';
import { randomizeArray } from './utils';

/**
 * Generate random coordinates using options.
 * @returns {IDataPoint[]}} - The coordinates.
 */
export const GenerateCoordinates = (): Array<IDataPoint> => {
	const sampleSize = settings.SampleSize;
	const colorFunction = graphColors?.find(e => e.name === settings.GraphColor)?.color;
	const sampleFunction = sampleTypes?.find(e => e.name === settings.SampleType)?.algorithm;

	if (colorFunction === undefined || sampleFunction === undefined) return [];

	const numbers: number[] = Array.from(Array(sampleSize).keys())	;
	const coordinates: Array<IDataPoint> = [];
	let topDataPoint = 0;
	let extraRandom = false;

	while (numbers.length > 0) {

		const [dataPosition, dataValue] = sampleFunction(numbers,  sampleSize - numbers.length, sampleSize);

		numbers.splice(numbers.indexOf(dataPosition), 1);

		coordinates.push({
			height: 0,
			data: dataValue,
			color: Number.isNaN(dataPosition) ? '#ff4040' : colorFunction(dataPosition, sampleSize, coordinates.length),
			id: dataPosition
		});
		if (topDataPoint < dataValue) topDataPoint = dataValue;
		if (Number.isNaN(dataPosition)) extraRandom = true;
	}

	for (let i = 0; i < coordinates.length; i++) {
		const currentResult = coordinates[i];
		currentResult.height = (100 * currentResult.data) / topDataPoint;
	}

	if (extraRandom === true) {
		const resultsLength = coordinates.length;


		for (let i = 0; i < resultsLength; i++) {
			(coordinates[i].id as number | undefined) = undefined;
		}

		for (let i = 0; i < resultsLength; i++) {
			const j = Math.floor(Math.random() * (i + 1));
			[coordinates[i], coordinates[j]] = [coordinates[j], coordinates[i]];
		}
		
		randomizeArray(coordinates);
	}

	return coordinates;
};
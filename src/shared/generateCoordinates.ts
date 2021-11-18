import { graphColors, sampleOrders, sampleTypes, settings } from 'src/settings';
import { IDataPoint } from './interfaces';
import { sortGraph } from './sortGraph';

/**
 * Generate random coordinates using settings.
 * @returns {IDataPoint[]}} - The coordinates.
 */
export const GenerateCoordinates = (): Array<IDataPoint> => {
	const sampleSize = settings.SampleSize;

	const colorFunction = graphColors.find(e => e.name === settings.GraphColor)?.color;
	const sampleTypeFunction = sampleTypes.find(e => e.name === settings.SampleType)?.algorithm;
	const sampleOrderFunction = sampleOrders.find(e => e.name === settings.SampleOrder)?.algorithm;

	if (colorFunction === undefined || sampleTypeFunction === undefined || sampleOrderFunction === undefined) return [];
	
	let coordinates: Array<IDataPoint> = [];
	let topDataPoint = 0;

	for (let i = 0; i < sampleSize; i++) {
		const dataValue = sampleTypeFunction(i, sampleSize);

		coordinates.push({
			height: 0,
			data: dataValue,
			color: '#ff4040',
			id: -1,
		});
		if (topDataPoint < dataValue) topDataPoint = dataValue;
	}

	coordinates = coordinates.sort((a, b) => a.data - b.data);
	
	for (let i = 0; i < coordinates.length; i++) {
		coordinates[i].id = i;
	}

	coordinates = sampleOrderFunction(coordinates);

	for (let i = 0; i < coordinates.length; i++) {
		const currentResult = coordinates[i];
		currentResult.height = (100 * currentResult.data) / topDataPoint;
		currentResult.color = colorFunction(coordinates.length, i, currentResult.id);
	}
	
	return coordinates;
};
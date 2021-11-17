import { IDataPoint } from './interfaces';
import { graphColors, settings } from '../settings';
/**
 * Randomizes a set of coordinates.
 * @param {IDataPoint[]}coordinates - The coordinates's of the graph.
 * @returns {IDataPoint[]} The randomized coordinates.
 */
export const randomizeArray = (coordinates: IDataPoint[]) => {
	const coordinatesLength = coordinates.length;
	const colorFunction = graphColors?.find(e => e.name === settings.GraphColor)?.color;
	if (colorFunction === undefined) return;

	for (let i = 0; i < coordinatesLength; i++) {
		let lowestValueIndex = 0;
		let lowestValue = Number.POSITIVE_INFINITY;

		for (let j = 0; j < coordinatesLength; j++) {
			if (lowestValue > coordinates[j].data && isNaN(coordinates[j].id)) {
				lowestValueIndex = j;
				lowestValue = coordinates[j].data;
			}
		}

		coordinates[lowestValueIndex].color = colorFunction(i, coordinatesLength, lowestValueIndex);
		coordinates[lowestValueIndex].id = i;
	}
};

/**
 * Determines if an array is sorted.
 * @param array - The array.
 * @returns {boolean} - True if the array is sorted.
 */
export const isArraySorted = (array: IDataPoint[]): boolean => {
	const compare = (left: IDataPoint, right: IDataPoint) => left.data > right.data;

	for (const [index, element] of array.entries()) {
		if (array[index + 1] && compare(element, array[index + 1])) {
			return false;
		}
	}

	return true;
};
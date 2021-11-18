import { IDataPoint } from './interfaces';
/**
 * Randomizes a set of coordinates.
 * @param {IDataPoint[]} coordinates - The coordinates's of the graph.
 * @returns {IDataPoint[]} The randomized coordinates.
 */
export const randomizeArray = (coordinates: IDataPoint[]): IDataPoint[] => {
	const coordinatesLength = coordinates.length;

	for (let i = 0; i < coordinatesLength; i++) {
		const j = Math.floor(Math.random() * (coordinatesLength - i + 1));
		[coordinates[i], coordinates[j]] = [coordinates[j], coordinates[i]];
	}

	return coordinates;
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
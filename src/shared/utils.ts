import { IDataPoint } from './interfaces';
/**
 * Randomizes a set of coordinates.
 * @param {IDataPoint[]} coordinates - The coordinates's of the graph.
 * @returns {IDataPoint[]} The randomized coordinates.
 */
export const randomizeArray = (coordinates: IDataPoint[]): IDataPoint[] => {
	const coordinatesLength = coordinates.length;

	for (let i = 0; i < coordinatesLength; i++) {
		const j = i + Math.floor(Math.random() * (coordinatesLength - i));
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
	for (const [index, element] of array.entries()) {
		if (array[index + 1] && element > array[index + 1]) {
			return false;
		}
	}

	return true;
};
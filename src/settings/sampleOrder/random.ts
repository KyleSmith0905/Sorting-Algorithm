import { randomizeArray } from '../../shared/utils';
import { IDataPoint } from '../../shared/interfaces';

export const name = 'Random';
export const algorithm = (coordinates: IDataPoint[]): IDataPoint[] => {
	coordinates = randomizeArray(coordinates);
	console.log(coordinates);
	return coordinates;
};
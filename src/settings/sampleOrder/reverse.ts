import { IDataPoint } from '../../shared/interfaces';

export const name = 'Reverse';
export const algorithm = (coordinates: IDataPoint[]): IDataPoint[] => {
	coordinates.reverse();
	return coordinates;
};
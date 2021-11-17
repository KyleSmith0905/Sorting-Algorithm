import { IDataPoint } from 'src/shared/interfaces';

export const LocalInsertionSort = (arr: IDataPoint[], data: any, area?: [number, number]): [IDataPoint[], any] => {
	let bucket = arr;
	let startArea = 0;
	if (area !== undefined) {
		bucket = arr.slice(area[0], area[1]);
		startArea = area[0];
	}
	if (data._pos === undefined) {
		data._stop = undefined;
		data._pos = 1;
	}

	if (data._pos < bucket.length) {
		if (data._point === undefined) data._point = arr[startArea + data._pos];
		if (data._compare === undefined) data._compare = startArea + data._pos - 1;
		
		data.highlight.push(data._compare);
		data.actionPoint = arr[startArea + data._compare];
		
		if (data._compare >= 0 && arr[data._compare].data > data._point.data) {
			arr[data._compare+1] = arr[data._compare];
			data._compare--;
		}

		if (data._compare < 0 || arr[data._compare].data <= data._point.data) {
			arr[data._compare+1] = data._point;
			data._pos++;
			data._point = undefined;
			data._compare = undefined;
		}
	}
	else {
		data._pos = undefined;
		data._point = undefined;
		data._compare = undefined;
		data._stop = true;
	}
	return [arr, data];
};
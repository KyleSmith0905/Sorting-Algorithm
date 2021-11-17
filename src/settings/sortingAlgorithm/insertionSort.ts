import { IDataPoint } from 'src/shared/interfaces';

export const name = 'Insertion Sort';
export const description = 'Insertion Sort loops through an array. With each element, the sort looks for a place to insert it.';
export const example = 'You are hanging up your recently washed shirts in your closet that is organized by color and type. You compare one washed shirt with each shirt in your closet from left to right until your washed shift is sorted. You then move on to another shirt and repeat the process.';
export const algorithm = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {
	
	if (data.pos === undefined) data.pos = 1;

	if (data.pos < arr.length) {
		if (data.point === undefined) data.point = arr[data.pos];
		if (data.compare === undefined) data.compare = data.pos - 1;
		
		data.highlight.push(data.compare);
		data.actionPoint = arr[data.compare];
		
		if (data.compare >= 0 && arr[data.compare].data > data.point.data) {
			arr[data.compare+1] = arr[data.compare];
			data.compare--;
		}

		if (data.compare < 0 || arr[data.compare].data <= data.point.data) {
			arr[data.compare+1] = data.point;
			data.pos++;
			data.point = undefined;
			data.compare = undefined;
		}
	}
	else {
		data.stop = true;
	}
	return [arr, data];
};
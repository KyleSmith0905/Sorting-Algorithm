import { IDataPoint } from 'src/shared/interfaces';

export const name = 'Stalin Sort';
export const description = 'Stalin Sort loops through the array and removes any values not already sorted.';
export const example = 'You are trying to organize multi-colored candies. You throw all of the candies randomly across the table, then you look through the candy and eat any candy that is not organized.';
export const algorithm = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {

	if (data.evaluating === undefined) data.evaluating = 0;
	if (data.tallest === undefined) data.tallest = Math.min(...arr.map(ele => ele.data));

	if (arr.length <= data.evaluating) data.stop = true;
	else if (arr[data.evaluating].data < data.tallest) arr.splice(data.evaluating, 1);
	else {
		data.tallest = arr[data.evaluating].data;
		data.evaluating++;
	}

	data.highlight.push(data.evaluating - 1);
	data.actionPoint = arr[data.evaluating - 1];

	return [arr, data];
};
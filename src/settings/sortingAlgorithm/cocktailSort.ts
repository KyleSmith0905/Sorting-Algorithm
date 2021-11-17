import { IDataPoint } from 'src/shared/interfaces';

export const name = 'Cocktail Sort';
export const description = 'Cocktail Sort sweeps across an array picking up the tallest value and moving it to the right. Than the sort switches to picking up the shortest value and moving it to the left. This process repeats.';
export const example = 'During an earthquake, everything from a store\'s spice aisle were knocked down. The store had sorted the spices by bitterness. You start at one side of the aisle and collect the most bitter spice and place it on the shelf, than you walk to the other side of the aisle and collect the least bitter spice and place it on the shelf. As the spices reach the center, you should have it organized.';
export const algorithm = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {
	if (data.swapped === undefined) data.swapped = true;
	if (data.start === undefined) data.start = 0;
	if (data.end === undefined) data.end = arr.length;
	if (data.stage === undefined) data.stage = 0;
		
	data.highlight.push(data.index, data.index+1);

	if (data.stage === 0) {
		if (data.index === undefined) data.index = data.start;
		data.actionPoint = arr[data.index];
		
		if (data.index < data.end) {
			if (arr[data.index]?.data > arr[data.index+1]?.data) {
				[arr[data.index], arr[data.index+1]] = [arr[data.index+1], arr[data.index]];
				data.swapped = true;
			}
			data.index++;
		}
		else {
			if (data.swapped === false) data.stop = true;
			data.index = undefined;
			data.swapped = false;
			data.end--;
			data.stage = 1;
		}
	}
	else if (data.stage === 1) {
		if (data.index === undefined) data.index = data.end;
		
		data.actionPoint = arr[data.index+1];
		if (data.index >= data.start) {
			if (arr[data.index]?.data > arr[data.index+1]?.data) {
				[arr[data.index], arr[data.index+1]] = [arr[data.index+1], arr[data.index]];
				data.swapped = true;
			}
			data.index--;
		}
		else {
			if (data.swapped === false) data.stop = true;
			data.swapped = false;
			data.index = undefined;
			data.stage = 0;
			data.start++;
		}
	}

	return [arr, data];
};
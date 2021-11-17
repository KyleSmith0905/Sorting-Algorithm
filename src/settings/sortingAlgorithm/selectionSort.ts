import { IDataPoint } from 'src/shared/interfaces';

export const name = 'Selection Sort';
export const description = 'Selection Sort find the lowest value of one array, and appends it to another array, until all elements went from the first array to the second.';
export const example = 'When working at a car dealership, you thought you should organize cars by size. You take the largest car and drive it to display, you keep driving cars onto the display until all the cars are on the display by size.';
export const algorithm = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {
	if (data.sorted === undefined) data.sorted = 0;
	if (data.sweeper === undefined) data.sweeper = 0;
	if (data.lowestValue === undefined) data.lowestValue = 0;

	if (data.sorted >= arr.length) {
		data.stop = true;
	}
	else if (data.sweeper >= arr.length) {
		data.actionPoint = arr[data.lowestValue];
		data.highlight.push(data.lowestValue, data.sorted);
		[arr[data.lowestValue], arr[data.sorted]] = [arr[data.sorted], arr[data.lowestValue]];
		data.sorted++;
		data.sweeper = data.sorted;
		data.lowestValue = data.sorted;
	}
	else {
		if (arr[data.sweeper].data < arr[data.lowestValue].data) data.lowestValue = data.sweeper;
		data.actionPoint = arr[data.sweeper];
		data.highlight.push(data.sweeper, data.lowestValue);
		data.sweeper++;
	}

	return [arr, data];
};
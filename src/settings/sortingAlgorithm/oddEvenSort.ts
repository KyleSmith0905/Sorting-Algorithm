import { IDataPoint } from 'src/shared/interfaces';

export const name = 'Odd-Even Sort';
export const description = 'Odd-Even Sort compares every other numbered element in a list with the one to the right of it, such that no elements are compared twice. The algorithms repeats this process until the list is sorted.';
export const example = 'As a coder, someone swapped all the lines of your code during lunch break. By moving one line at a time (Alt + ARROW_KEYS) you need to fix the mistake. Every even line number you will swap with the next line if out of order. You repeat this with odd line numbers. Keep swapping evens and odds until it is sorted.';
export const algorithm = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {

	if (data.sorted === undefined) data.sorted = true;
	if (data.stage === undefined) data.stage = 0;
	data.actionPoint = arr[data.loop];
	
	if (data.stage === 0) {
		if (data.loop === undefined) data.loop = 1;
		data.highlight.push(data.loop, data.loop + 1);
		
		if (arr[data.loop]?.data > arr[data.loop+1]?.data) {
			[arr[data.loop], arr[data.loop+1]] = [arr[data.loop+1], arr[data.loop]];
			data.sorted = false;
		}
		data.loop += 2;
		
		if (data.loop >= arr.length) {
			data.stage = 1;
			data.loop = undefined;
		}
	}
	else if (data.stage === 1) {
		if (data.loop === undefined) data.loop = 0;
		data.highlight.push(data.loop, data.loop + 1);

		if (arr[data.loop]?.data > arr[data.loop+1]?.data) {
			[arr[data.loop], arr[data.loop+1]] = [arr[data.loop+1], arr[data.loop]];
			data.sorted = false;
		}
		data.loop += 2;

		if (data.loop >= arr.length - 1) {
			if (data.sorted === true) data.stop = true;
			data.loop = undefined;
			data.stage = undefined;
			data.sorted = undefined;
		}
	}

	return [arr, data];
};
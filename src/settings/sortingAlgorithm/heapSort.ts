import { IDataPoint } from 'src/shared/interfaces';

export const name = 'Heap Sort';
export const description = 'Heap Sort maintains a tree (or "heap") as an unsorted array and an additional sorted array. Every iteration the heap sort moves the tallest element into the sorted array, and then it maintains the heap.';
export const example = 'You are managing a recruitment team for a big company. Each bottom-level employees receives a batch of applications that will be organized by skill. Middle-level receives a few applications from bottom-level, they organize them by skill. The top-level selects from applications the middle-level gave them.';
export const algorithm = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {

	const siftDown = (start: number, end: number) => {
		if (data.sifting === undefined) data.sifting = true;
		if (data.root === undefined) data.root = start;

		if (data.root * 2 + 1 <= end) {
			let child = data.root * 2 + 1;
			if (child + 1 <= end && arr[child]?.data < arr[child + 1]?.data) {
				data.actionPoint = arr[child + 1];
				data.highlight.push(child, child + 1);
				child++;
			}
			if (arr[data.root]?.data < arr[child]?.data) {
				[arr[data.root], arr[child]] = [arr[child], arr[data.root]];
				data.actionPoint = arr[data.root];
				data.highlight.push(data.root, child);
				data.root = child;
			}
			else {
				data.root = undefined;
				data.sifting = false;
			}
		}
		else {
			data.root = undefined;
			data.sifting = false;
		}
	};
	
	if (data.start === undefined) data.start = Math.floor(arr.length / 2) - 1;
	
	if (data.start >= 0) {
		if (data.sifting === false) {
			data.sifting = true;
			data.start--;
		}
		data.highlight.push(data.start);
		data.actionPoint = arr[data.start];
		siftDown(data.start, arr.length - 1);
	}
	else {
		if (data.end === undefined) data.end = arr.length - 1;
		if (data.end > 0) {
			if (data.sifting === false) {
				data.sifting = true;
				[arr[data.end], arr[0]] = [arr[0], arr[data.end]];
				data.highlight.push(0, data.end);
				data.end--;
			}
			data.actionPoint = arr[0];
			siftDown(0, data.end);
			data.dataPoint = arr[0];
		}
		else {
			data.stop = true;
		}
	}
	
	return [arr, data];
};
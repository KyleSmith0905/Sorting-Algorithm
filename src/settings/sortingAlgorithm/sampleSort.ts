import { IDataPoint } from 'src/shared/interfaces';
import { LocalInsertionSort } from './_shared';

export const name = 'Sample Sort';
export const description = 'Sample Sort works using three steps. First, gather the first few elements, sort the values, and creates a bucket with each. Second, loop through the data and place each element in a bucket based on their value. Third, loop through each bucket and sort the elements.';
export const example = 'An AI is collecting information about cars with no prior knowledge. The AI gives you 6 completely random pictures of cars using traffic cameras. After you labelled the 6 cars, it start labelling cars using the 6 labels. Now, the AI shows you every car for you to label, you identify each one individually. Now the AI knows about every type of car.';
export const algorithm = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {
	
	if (data.stage === undefined) data.stage = 0;

	if (data.stage === 0) {
		LocalInsertionSort(arr, data, [0, data.settings.size - 1]);

		if (data._stop === true) { 		
			data.splitters = arr.slice(0, data.settings.size - 1);
			data.stage = 1;
		}
	}
	else if (data.stage === 1) {
		if (data.buckets === undefined) data.buckets = Array.from({length: data.splitters.length + 1}, () => []);
		if (data.loop1 === undefined) data.loop1 = 0;
		if (data.loop2 === undefined) data.loop2 = 0;
		if (data.bucketLength === undefined) data.bucketLength = 0;
		if (data.orginalArray === undefined) data.orginalArray = arr;

		let insertBucket = false;

		data.highlight.push(data.loop1, arr.findIndex((e) => e.data === data.splitters[data.loop2 >= data.splitters.length ? 0 : data.loop2].data));
		data.actionPoint = arr[data.loop1];

		if ((data.splitters[data.loop2 - 1]?.data ?? Number.NEGATIVE_INFINITY) < data.orginalArray[data.loop1].data && (data.splitters[data.loop2]?.data ?? Number.POSITIVE_INFINITY) >= data.orginalArray[data.loop1].data) {
			data.buckets[data.loop2].push(data.orginalArray[data.loop1]);
			insertBucket = true;
			arr = [...data.buckets.flat(), ...arr.slice(data.loop1 + 1)];
		}

		data.loop2++;

		if (data.loop2 >= data.splitters.length + 1 || insertBucket) {
			data.loop1++;
			data.loop2 = undefined;
			if (data.loop1 >= arr.length) {
				data.loop1 = undefined;
				data.orginalArray = undefined;
				data.stage = 2;
			}
		}

	}
	else if (data.stage === 2) {
		if (data.loop === undefined) data.loop = 0;
		if (data.sortArea === undefined) {
			let endingArea = arr.length;
			if (data.loop < data.splitters.length - 1) endingArea = arr.findIndex((e) => e.data === data.splitters[data.loop + 1].data);

			data.sortArea = [arr.findIndex((e) => e.data === data.splitters[data.loop].data), endingArea];
		}

		LocalInsertionSort(arr, data, data.sortArea);

		if (data._stop === true) {
			if (data.loop >= data.splitters.length - 1) {
				data.stop = true;
				return [arr, data];
			}
			data.loop++;
			
			let endingArea = arr.length;
			if (data.loop < data.splitters.length - 1) endingArea = arr.findIndex((e) => e.data === data.splitters[data.loop + 1].data);

			data.sortArea = [arr.findIndex((e) => e.data === data.splitters[data.loop].data), endingArea];
		}
	}

	return [arr, data];
};
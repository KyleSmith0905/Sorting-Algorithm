import { IDataPoint } from 'src/shared/interfaces';

export const name = 'Bubble Sort';
export const description = 'Bubble Sort loops through the array to compare each number with the number before it, the bigger values moves to the right. So, small values are shifted left as large values are moved to the right.';
export const example = 'You are trying to pick up litter along a road. As you are running down the road you picked up a small piece of litter. You continue on the path until you found a larger piece of litter, you drop the small litter for the larger litter. After putting the large litter in the trash at the end of the road, you decide to run down the road again doing the same thing.';
export const algorithm = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {
	if (data.loop1 === undefined) data.loop1 = 0;
	
	if (data.loop1 < arr.length) {
		if (data.loop2 === undefined) data.loop2 = 0;
		
		if (data.loop2 < arr.length - data.loop1) {
			data.loop2++;
			if (arr[data.loop2 - 1]?.data > arr[data.loop2]?.data) {
				[arr[data.loop2 - 1], arr[data.loop2]] = [arr[data.loop2], arr[data.loop2 - 1]];
				data.highlight.push(data.loop2 - 1, data.loop2);
				data.actionPoint = arr[data.loop2];
			}
		}
		else {
			data.loop1++;
			data.loop2 = undefined;
		}
	}
	else {
		data.stop = true;
	}
	return [arr, data];
};
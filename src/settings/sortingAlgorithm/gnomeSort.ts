import { IDataPoint } from 'src/shared/interfaces';

export const name = 'Gnome Sort';
export const description = 'Cocktail Sort sweeps across an array picking up the tallest value and moving it to the right. Than the sort switches to picking up the shortest value and moving it to the left. This process repeats.';
export const example = 'During an earthquake, everything from a store\'s spice aisle were knocked down. The store had sorted the spices by bitterness. You start at one side of the aisle and collect the most bitter spice and place it on the shelf, than you walk to the other side of the aisle and collect the least bitter spice and place it on the shelf. As the spices reach the center, you should have it organized.';
export const algorithm = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {
	if (data.pos === undefined) data.pos = 0;

	if (data.pos < arr.length) {

		if (data.localPos === undefined) data.localPos = data.pos;

		
		if (data.localPos > 0 && arr[data.localPos-1].data > arr[data.localPos].data) {
			[arr[data.localPos], arr[data.localPos-1]] = [arr[data.localPos-1], arr[data.localPos]];
			data.localPos--;
		}
		
		data.highlight.push(data.localPos-1, data.localPos);
		data.actionPoint = arr[data.localPos - 1];

		if (data.localPos <= 0 || arr[data.localPos-1].data <= arr[data.localPos].data) {
			data.pos++;
			data.localPos = undefined;
		}
	}
	else {
		data.stop = true;
	}
	return [arr, data];
};
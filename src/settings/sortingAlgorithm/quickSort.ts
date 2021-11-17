import { IDataPoint } from 'src/shared/interfaces';

export const name = 'Quick Sort';
export const description = 'Quick Sort compares all elements of a list to a pivot, larger values appear on one side, smaller values appear on the other side. Quick Sort continuously keeps selecting pivots until it could guarantee all points are sorted.';
export const example = 'When moving into a new house, you place every kitchen item in the kitchen and everything else is placed in the living room. You then seperate all kitchen items into refrigerated items and normal items. You keep seperating items until everything has been individually placed correctly.';
export const algorithm = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {
	
	if (Array.isArray(data.nests) && data.nests.length === 0) {
		data.stop = true;
		return [arr, data];
	}
	
	if (!data.nests) data.nests = [[0, arr.length - 1]];
	const currentNest: [number, number] = data.nests[0];

	if (currentNest.length > 1) {
		const middle = Math.floor((currentNest[0] + currentNest[1]) / 2);
		
		if (data.leftPoint === undefined) data.leftPoint = currentNest[0];
		if (data.rightPoint === undefined) data.rightPoint = currentNest[1];
		if (data.pivot === undefined) data.pivot = arr[middle];
		
		data.highlight.push(middle);

		if (data.leftPoint < data.rightPoint + 1) {
			if (arr[data.leftPoint].data < data.pivot.data) {
				data.actionPoint = arr[data.leftPoint];
				data.highlight.push(data.leftPoint);
				data.leftPoint++;
			}
			else if (arr[data.rightPoint].data > data.pivot.data) {
				data.actionPoint = arr[data.rightPoint];
				data.highlight.push(data.rightPoint);
				data.rightPoint--;
			}
			else {
				data.actionPoint = data.pivot;
	
				if(data.leftPoint <= data.rightPoint) {
					[arr[data.leftPoint], arr[data.rightPoint]] = [arr[data.rightPoint], arr[data.leftPoint]];
					data.leftPoint++;
					data.rightPoint--;
					data.highlight.push(data.leftPoint, data.rightPoint);
				}
				else {
					data.actionPoint = data.pivot;
				}
			}
		}
		else {
			if (currentNest[0] < data.leftPoint - 1) {
				data.nests.push([currentNest[0], data.leftPoint - 1]);
			}
			if (data.leftPoint < currentNest[1]) {
				data.nests.push([data.leftPoint, currentNest[1]]);
			}
			data.nests.shift();

			data.leftPoint = undefined;
			data.rightPoint = undefined;
			data.pivot = undefined;
		}
	}
	else {
		data.nests.shift();
	}

	return [arr, data];
};
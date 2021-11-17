import { IDataPoint } from 'src/shared/interfaces';

export const name = 'Sleep Sort';
export const description = 'Sleep Sort simultaneously waits the value of the element in milliseconds for each element. Due to inconsistencies with the function execution time or computer\'s internal time, it will repeat it but wait a longer amount of time.';
export const example = 'At a stud farm, you want to sort horses by speed so you could sell them for a good price. You decided you will race them in a local track. After racing them, you now have a sorted list of horse speed.';
export const algorithm = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {
	
	if (data.timesSorted === undefined) {
		data.timesSorted = 0;
	}

	if (data.checkIsSorting === true) {
		data.actionPoint = arr[data.checkSortingPosition];
		data.highlight.push(data.checkSortingPosition, data.checkSortingPosition + 1);
		if (arr[data.checkSortingPosition + 1] === undefined) {
			data.stop = true;
			return [arr, data];
		}
		if(arr[data.checkSortingPosition + 1].data < arr[data.checkSortingPosition].data) {
			data.checkIsSorting = false;
		}
		data.checkSortingPosition++;
	}
	else if (data.isSorting === undefined || data.isSorting === false) {
		data.isSorting = true;
		const startArray: IDataPoint[] = arr;
		let numSorted = 0;
		
		let lowestValue = 0;
		for (let i = 0; i < startArray.length; i++) {
			if (lowestValue > startArray[i].data) lowestValue = startArray[i].data;
		}

		startArray.forEach((ele: IDataPoint, index: number) => {
			window.setTimeout(() => {
				data.actionPoint = ele;
				data.highlight.push(index);
				arr.push(ele);
				arr.shift();
				numSorted++;
				if (startArray.length <= numSorted ) {
					setTimeout(() => {
						data.checkIsSorting = true;
						data.checkSortingPosition = 0;
						data.timesSorted++;
						data.isSorting = false;
					}, 10);
				}
			}, ele.data * Math.pow(data.timesSorted + 1, 2) * (data.settings.sortingSpeed / 4));
		});
	}
	else {
		data.highlight.push(arr.length - 1);
	}
	
	return [arr, data];
};
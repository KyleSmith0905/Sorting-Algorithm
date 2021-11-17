import { IDataPoint } from 'src/shared/interfaces';

export const name = 'Bogo Sort';
export const description = 'Bogo Sort randomizes the list of elements. Than it checks if the elements are sorted.';
export const example = 'Your child has a bag of 8 colored marbles that they are trying to organize. they keep rolling the marbles around randomly until it makes a rainbow. On average, after rolling 2,903,040 marbles your baby is likely to sort them.';
export const algorithm = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {
	
	const shuffleArray = (arr: IDataPoint[]) => {
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	};
	
	if (data.sorting === true) {
		data.actionPoint = arr[data.sortPosition];
		data.highlight.push(data.sortPosition, data.sortPosition + 1);
		if (arr[data.sortPosition + 1] === undefined) {
			data.stop = true;
			return [arr, data];
		}
		if(arr[data.sortPosition + 1].data < arr[data.sortPosition].data) {
			data.sorting = false;
		}
		data.sortPosition++;
	}
	else {
		data.sortPosition = 0;
		data.sorting = true;
		arr = shuffleArray(arr);
	}
	
	return [arr, data];
};
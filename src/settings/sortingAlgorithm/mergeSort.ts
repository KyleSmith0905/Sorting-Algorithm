import { IDataPoint } from 'src/shared/interfaces';

export const name = 'Merge Sort';
export const description = 'Merge Sort starts by sorting every two elements. Then, the lists are sorted by comparing only the two smallest elements until all the elements are in ordered.';
export const example = 'You are organizing a messy library which only sorts books alphabetically. You organize each layer of each shelf individually, which helped you organize each book shelf. By dividing the library into smaller groups, every time you compare books you only had to compare two at a time.';
export const algorithm = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {

	if (data.evaluatingPosition === undefined) {
		data.evaluating = [[arr[0]],[arr[1]]];
		data.sorted = [2];
		data.evaluatingPosition = 0;
		if (arr.length <= 1) {
			data.stop = true;
			return [arr, data];
		}
	}

	if (isNaN(data.evaluatingPosition) || (data.evaluatingPosition === arr.length - 1 && data.sorted[0] === arr.length) || (data.regroup === true && data.evaluatingPosition === -1) || data.stop === true) {
		data.stop = true;
	}

	if (data.evaluating[0].length === 0 || data.evaluating[0][0]?.data > data.evaluating[1][0]?.data)
	{
		data.actionPoint = data.evaluating[1][0];
		data.highlight.push(data.evaluatingPosition);
		arr[data.evaluatingPosition] = data.evaluating[1][0];
		data.evaluatingPosition++;
		data.evaluating[1].shift();
	}
	else if (data.evaluating[1].length === 0 || data.evaluating[1][0]?.data >= data.evaluating[0][0]?.data)
	{
		data.actionPoint = data.evaluating[0][0];
		data.highlight.push(data.evaluatingPosition);
		arr[data.evaluatingPosition] = data.evaluating[0][0];
		data.evaluatingPosition++;
		data.evaluating[0].shift();
	}
	if (data.evaluating[0].length === 0 && data.evaluating[1].length === 0) {
		const sortedData: number[] = data.sorted;
		let evaluationLength: number = sortedData[sortedData.length - 1];
		let evaluationLengthPrevious: number = sortedData[sortedData.length - 2] ?? 0;
		if (evaluationLength === evaluationLengthPrevious && evaluationLength) {
			data.evaluatingPosition -= evaluationLength * 2;
			data.evaluating = [
				arr.slice(data.evaluatingPosition, data.evaluatingPosition + evaluationLengthPrevious),
				arr.slice(data.evaluatingPosition + evaluationLengthPrevious, data.evaluatingPosition + evaluationLengthPrevious + evaluationLength)
			];
			data.sorted[sortedData.length - 2] *= 2;
			data.sorted.pop();
		}
		else if (data.regroup === true || arr[data.evaluatingPosition + 1] === undefined || arr[data.evaluatingPosition] === undefined) {
			let shiftX = 0;
			if (arr.length % 2 === 1 && data.regroup === undefined) {
				evaluationLengthPrevious = sortedData[sortedData.length - 1];
				evaluationLength = 1;
				shiftX = 1;
			}
			
			data.evaluatingPosition -= evaluationLength + evaluationLengthPrevious + -shiftX;
			
			data.evaluating = [
				arr.slice(data.evaluatingPosition, data.evaluatingPosition + evaluationLengthPrevious),
				arr.slice(data.evaluatingPosition + evaluationLengthPrevious, data.evaluatingPosition + evaluationLengthPrevious + evaluationLength)
			];
			
			if (data.regroup === true && data.sorted.length === 2) {
				data.evaluating[0] = arr.slice(0, data.evaluatingPosition - evaluationLength + shiftX);
			}
			
			if (data.evaluating[1].length <= 2) data.sorted[sortedData.length - 1] += 1;
			else {
				data.sorted[sortedData.length - 2] += evaluationLength;
				data.sorted.pop();
			}
			
			data.regroup = true;
		}
		else {
			data.sorted.push(2);
			data.evaluating = [[arr[data.evaluatingPosition]], [arr[data.evaluatingPosition + 1]]];
		}
	}
	
	return [arr, data];
};
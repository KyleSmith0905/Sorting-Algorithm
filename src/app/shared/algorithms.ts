import { IDataPoint } from "./dataGenerator";

export const quickSort = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {
	
	if (Array.isArray(data.nests) && data.nests.length === 0) {
		data.stop = true;
		return [arr, data];
	};
	
	if (!data.nests) data.nests = [[0, arr.length - 1]];
	let currentNest: [number, number] = data.nests[0];

	if (currentNest.length > 1) {
		const middle = Math.floor((currentNest[0] + currentNest[1]) / 2);

		
		if (data.leftPoint === undefined) data.leftPoint = currentNest[0];
		if (data.rightPoint === undefined) data.rightPoint = currentNest[1];
		if (data.pivot === undefined) data.pivot = arr[middle];
				
		if (data.leftPoint < data.rightPoint + 1) {
			while(arr[data.leftPoint].data < data.pivot.data) {
				data.leftPoint++;
			}
			while(arr[data.rightPoint].data > data.pivot.data) {
				data.rightPoint--;
			}
			
			if(data.leftPoint <= data.rightPoint) {
				[arr[data.leftPoint], arr[data.rightPoint]] = [arr[data.rightPoint], arr[data.leftPoint]];
				data.leftPoint++;
				data.rightPoint--;
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
}

export const mergeSort = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {

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
		arr[data.evaluatingPosition++] = data.evaluating[1][0];
		data.evaluating[1].shift();
	}
	else if (data.evaluating[1].length === 0 || data.evaluating[1][0]?.data >= data.evaluating[0][0]?.data)
	{
		arr[data.evaluatingPosition++] = data.evaluating[0][0];
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
				shiftX = 1
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
			data.evaluating = [[arr[data.evaluatingPosition]], [arr[data.evaluatingPosition + 1]]]
		}
	}
	
	return [arr, data];
}

export const insertionSort = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {
	
	if (data.leftPoint === undefined) data.leftPoint = 0;
	
	
	if(data.leftPoint + 1 >= arr.length && data.rightPoint === undefined) {
		data.stop = true;
		return [arr, data]
	}

	if (data.rightPoint === undefined) {
		data.leftPoint++;
		data.rightPoint = data.leftPoint - 1;
		data.movingValue = arr[data.leftPoint];
	}
	
	if (data.rightPoint >= 0 && arr[data.rightPoint].data > data.movingValue.data) {
		[arr[data.rightPoint + 1], arr[data.rightPoint]] = [arr[data.rightPoint], arr[data.rightPoint + 1]];
		data.rightPoint--;
	}
	else {
		data.rightPoint = undefined;
		data.movingValue = undefined;
	}

	return [arr, data]
}

export const radixSort = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {
  if (!arr.length || arr.length === 1) return [arr, data];
	
	if (data.numberPosition === undefined)	{
		let numberMax = arr[0];
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].data > numberMax.data) numberMax = arr[i]
		}
		data.numberPosition =	numberMax.data.toString(2).length;
	}
	else if (data.transforming) {
		arr.shift();
		arr.push(data.transforming[data.transformingPosition]);
		data.transformingPosition++;
		if (data.transformingPosition === arr.length) {
			data.transforming = undefined;
			data.transformingPosition = undefined;
		}
	}
	else {
		if (data.position === undefined) data.position = 0;
		if (data.buckets === undefined) data.buckets = Array.from({length:2}, () => []);
		if (data.position < data.numberPosition) {
			
			if (data.evaluatingPosition === undefined) data.evaluatingPosition = 0;
			if (data.evaluatingPosition < arr.length) {
				data.buckets[Math.floor(Math.abs(arr[data.evaluatingPosition].data) / Math.pow(2, data.position)) % 2].push(arr[data.evaluatingPosition])

				data.evaluatingPosition++
			}
			else {
				data.position++;
				data.evaluatingPosition = undefined;
				data.transforming = [].concat(...data.buckets);
				data.transformingPosition = 0;
				data.buckets = undefined;
			}
		}
		else {
			data.stop = true;
		}
	}

	return [arr, data]
}

export const bogoSort = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {
	const isSorted = (arr: IDataPoint[]) => {
		let sorted = true;
		
		for(let i = 0; i < arr.length -1; i++) {
			if(arr[i + 1].data < arr[i].data) {
				sorted = false;
			}
		}

		return sorted;
	}
	
	const shuffleArray = (arr: IDataPoint[]) => {
		for (var i = arr.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
		}
		return arr;
	}
	
	if (isSorted(arr) === false) arr = shuffleArray(arr);
	else {
		data.stop = true;
	}
	
	return [arr, data];
}
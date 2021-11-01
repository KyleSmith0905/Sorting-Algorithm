import { IDataPoint } from "./constants";

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
	
	if (data.pos === undefined) data.pos = 1;

	if (data.pos < arr.length) {
		if (data.point === undefined) data.point = arr[data.pos];
		if (data.compare === undefined) data.compare = data.pos - 1;
		
		data.highlight.push(data.compare);
		data.actionPoint = arr[data.compare];
		
		if (data.compare >= 0 && arr[data.compare].data > data.point.data) {
			arr[data.compare+1] = arr[data.compare];
			data.compare--;
		}

		if (data.compare < 0 || arr[data.compare].data <= data.point.data) {
			arr[data.compare+1] = data.point;
			data.pos++;
			data.point = undefined;
			data.compare = undefined;
		}
	}
	else {
		data.stop = true;
	}
	return [arr, data]
}

export const selectionSort = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {
	if (data.sorted === undefined) data.sorted = 0;
	if (data.sweeper === undefined) data.sweeper = 0
	if (data.lowestValue === undefined) data.lowestValue = 0;

	if (data.sorted >= arr.length) {
		data.stop = true;
	}
	else if (data.sweeper >= arr.length) {
		data.actionPoint = arr[data.lowestValue];
		data.highlight.push(data.lowestValue, data.sorted);
		[arr[data.lowestValue], arr[data.sorted]] = [arr[data.sorted], arr[data.lowestValue]];
		data.sorted++;
		data.sweeper = data.sorted;
		data.lowestValue = data.sorted;
	}
	else {
		if (arr[data.sweeper].data < arr[data.lowestValue].data) data.lowestValue = data.sweeper;
		data.actionPoint = arr[data.sweeper];
		data.highlight.push(data.sweeper, data.lowestValue);
		data.sweeper++;
	}

	return [arr, data];
}

export const bitonicSort = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {

	if (Math.log2(arr.length) % 1 !== 0) {
		data.stop = true;
		data.error = 'Bitonic Sort cannot sort when sample size is not a power of 2.';
	}

	if (data.loop1 === undefined) data.loop1 = 2;
	if (data.loop1 <= arr.length) {
		
		if (data.loop2 === undefined) data.loop2 = data.loop1 * 0.5;
		if (data.loop2 >= 1) {
			if (data.loop3 === undefined) data.loop3 = 0;

			
			if (data.loop3 < arr.length) {
				let l = data.loop3 ^ data.loop2;
				if (l > data.loop3) {
					if (
						((data.loop3 & data.loop1) === 0 && arr[data.loop3].data > arr[l].data)
						|| ((data.loop3 & data.loop1) !== 0) && (arr[data.loop3].data < arr[l].data)
					) {
							data.highlight.push(data.loop3, l);
							data.actionPoint = arr[l];
							[arr[data.loop3], arr[l]] = [arr[l], arr[data.loop3]];
					}
				}
				data.loop3++;
			}

			if (data.loop3 >= arr.length) {
				data.loop3 = undefined;
				data.loop2 *= 0.5;
			}
		}
		if (data.loop2 < 1) {
			data.loop2 = undefined;
			data.loop1 *= 2
		}
	}
	else {
		data.stop = true;
	}
	
	return [arr, data];
}

export const radixSort = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {
	if (!arr.length || arr.length === 1) return [arr, data];
	
	if (data.numberPosition === undefined)	{

		let largestInteger = 0;
		let largestDecimal = 0;

		for (let i = 0; i < arr.length; i++) {
			let splitData = arr[i].data.toString(data.settings.radix).split('.');
			let integer = splitData[0].length;
			let decimal = splitData[1]?.length;
			
			if (integer > largestInteger) largestInteger = integer;
			if (decimal > largestDecimal) largestDecimal = decimal;
		}

		data.numberPosition =	largestInteger + largestDecimal;
		data.largestDecimal = largestDecimal;
		data.largestInteger = largestInteger;
	}
	else if (data.transforming) {
		arr.shift();
		arr.push(data.transforming[data.transformingPosition]);
		data.actionPoint = arr[arr.length - 1];
		data.highlight.push(arr.length - 1);
		data.transformingPosition++;
		if (data.transformingPosition === arr.length) {
			data.transforming = undefined;
			data.transformingPosition = undefined;
		}
	}
	else if (data.settings.sortBy === 'LSD') {
		
		if (data.position === undefined) data.position = -data.largestDecimal;
		if (data.evaluatingPosition === undefined) data.evaluatingPosition = 0;
		if (data.buckets === undefined) data.buckets = Array.from({length: data.settings.radix}, () => []);

		if (data.position < data.largestInteger && data.evaluatingPosition < arr.length) {
			data.buckets[Math.floor(Math.abs(arr[data.evaluatingPosition].data) / Math.pow(data.settings.radix, data.position)) % data.settings.radix].push(arr[data.evaluatingPosition])
	
			data.actionPoint = arr[data.evaluatingPosition];
			data.highlight.push(data.evaluatingPosition);
			
			data.evaluatingPosition++;
		}
		else if (data.position < data.largestInteger) {
			data.position++;
			data.evaluatingPosition = undefined;
			data.transforming = [].concat(...data.buckets);
			data.transformingPosition = 0;
			data.buckets = undefined;
		}
		else {
			data.stop = true;
		}
	}
	else { // MSD sort by default

		if (data.buckets === undefined) data.buckets = [arr];
		if (data.evaluatingPosition === undefined) data.evaluatingPosition = 0;
		if (data.buckets === undefined) data.stops = [];
		if (data.bucketSplitIndex === undefined) data.bucketSplitIndex = 0;
		if (data.bucketSplitInternal === undefined) data.bucketSplitInternal = 0;
		if (data.position === undefined) data.position = data.largestInteger;

		if (data.position > -data.largestDecimal && data.evaluatingPosition < arr.length) {
			
			if (data.bucketSplit === undefined) data.bucketSplit = Array.from({length: data.settings.radix}, () => []);

			data.bucketSplit[Math.floor(Math.abs(arr[data.evaluatingPosition].data) / Math.pow(data.settings.radix, data.position - 1)) % data.settings.radix].push(data.buckets[data.bucketSplitIndex][data.bucketSplitInternal]);

			if (data.buckets[data.bucketSplitIndex].length - 1 <= data.bucketSplitInternal && data.buckets[data.bucketSplitIndex].length > 0) {
				let removed = 0;
				for (let i = 0; i < data.bucketSplit.length; i++) {
					if (data.bucketSplit[i].length <= 0) {
						data.bucketSplit.splice(i, 1);
						removed++;
					}
				}
				data.buckets.splice(data.bucketSplitIndex, 1, ...data.bucketSplit);
				data.bucketSplitIndex += data.settings.radix - removed;
				data.bucketSplitInternal = -1;
				data.bucketSplit = undefined;
			}

			data.bucketSplitInternal++;
			
			data.actionPoint = arr[data.evaluatingPosition];
			data.highlight.push(data.evaluatingPosition);
			
			data.evaluatingPosition++;			
		}
		else if (data.position > -data.largestDecimal) {
			data.position--;
			data.evaluatingPosition = undefined;
			data.transforming = [].concat(...data.buckets);
			data.transformingPosition = 0;
			data.bucketSplitInternal = 0;
			data.bucketSplitIndex = 0;
			data.bucketSplit = undefined;
		}
		else {
			data.stop = true;
		}
	}
	
	return [arr, data]
}

export const bogoSort = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {
	
	
	const shuffleArray = (arr: IDataPoint[]) => {
		for (let i = arr.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]]
		}
		return arr;
	}
	
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
}

export const sleepSort = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {
	
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
					}, 10)
				}
			}, ele.data * Math.pow(data.timesSorted + 1, 2) * (data.settings.sortingSpeed / 4))
		})
	}
	else {
		data.highlight.push(arr.length - 1);
	}
	
	return [arr, data]
}

export const stalinSort = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {

	if (data.evaluating === undefined) data.evaluating = 0;
	if (data.tallest === undefined) data.tallest = Math.min(...arr.map(ele => ele.data));

	if (arr.length <= data.evaluating) data.stop = true;
	else if (arr[data.evaluating].data < data.tallest) arr.splice(data.evaluating, 1);
	else {
		data.tallest = arr[data.evaluating].data;
		data.evaluating++;
	}

	data.highlight.push(data.evaluating - 1);
	data.actionPoint = arr[data.evaluating - 1];

	return [arr, data];
}

export const bubbleSort = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {
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
}

export const shellSort = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {

	let gaps: number[] = [];
	
	if (data.gaps === undefined) {
		switch (data.settings.gap) {
			case 'Tokuda': {
				gaps.push(1);
				let index = 1;
				while (gaps[0] < arr.length) {
					gaps.unshift(Math.ceil((9 * Math.pow(2.25, index) - 4) / 5))
					index++;
				}
				gaps.shift();
				break;
			}
			case 'Shell': {
				gaps.push(arr.length / 2);
				while (gaps[gaps.length - 1] > 1) {
					gaps.push(gaps[gaps.length - 1] / 2);
				}
				break;
			}
			case 'Hibbard': {
				gaps.push(1);
				let index = 2;
				while (gaps[0] < arr.length) {
					gaps.unshift(Math.pow(2, index) - 1);
					index++;
				}
				gaps.shift();
				break;
			}
			default: gaps = [701, 301, 132, 57, 23, 10, 4, 1]
		}
		data.gaps = gaps;
	}
	else gaps = data.gaps;

	if (data.gapIndex === undefined) data.gapIndex = 0;
	const gap = gaps[data.gapIndex];

	if (data.gapIndex < gaps.length) {
		if (data.loop1 === undefined) data.loop1 = gap;
	
		if (data.loop1 < arr.length) {

			if (data.swapPoint === undefined) data.swapPoint = arr[data.loop1];
			if (data.loop2 === undefined) data.loop2 = data.loop1;

			if (data.loop2 >= gap && arr[data.loop2 - gap].data > data.swapPoint.data) {
				data.actionPoint = arr[data.loop2];
				data.highlight.push(data.loop2, data.loop2 - gap)
				arr[data.loop2] = arr[data.loop2 - gap]
				data.loop2 -= gap;
			}
			else {
				data.highlight.push(data.loop2, data.loop2 - gap)
				data.loop1++;
				data.loop2 = undefined;
				data.swapPoint = undefined
			}
			
			arr[data.loop2] = data.swapPoint;
		}
		else {
			data.highlight.push(data.loop2, data.loop2 - gap)
			data.loop1 = undefined;
			data.gapIndex++;
		}
	}
	else {
		data.stop = true;
	}

	return [arr, data];
}

export const heapSort = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {

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
				[arr[data.root], arr[child]] = [arr[child], arr[data.root]]
				data.actionPoint = arr[data.root];
				data.highlight.push(data.root, child);
				data.root = child
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
	}
	
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
				data.highlight.push(0, data.end)
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
}

export const cocktailSort = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {
	if (data.swapped === undefined) data.swapped = true;
	if (data.start === undefined) data.start = 0;
	if (data.end === undefined) data.end = arr.length;
	if (data.stage === undefined) data.stage = 0;
		
	data.highlight.push(data.index, data.index+1)

	if (data.stage === 0) {
		if (data.index === undefined) data.index = data.start;
		data.actionPoint = arr[data.index]
		
		if (data.index < data.end) {
			if (arr[data.index]?.data > arr[data.index+1]?.data) {
				[arr[data.index], arr[data.index+1]] = [arr[data.index+1], arr[data.index]];
				data.swapped = true;
			}
			data.index++;
		}
		else {
			if (data.swapped === false) data.stop = true;
			data.index = undefined;
			data.swapped = false;
			data.end--;
			data.stage = 1;
		}
	}
	else if (data.stage === 1) {
		if (data.index === undefined) data.index = data.end;
		
		data.actionPoint = arr[data.index+1];
		if (data.index >= data.start) {
			if (arr[data.index]?.data > arr[data.index+1]?.data) {
				[arr[data.index], arr[data.index+1]] = [arr[data.index+1], arr[data.index]]
				data.swapped = true;
			}
			data.index--;
		}
		else {
			if (data.swapped === false) data.stop = true;
			data.swapped = false;
			data.index = undefined;
			data.stage = 0;
			data.start++;
		}
	}



	return [arr, data];
}

export const gnomeSort = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {
	if (data.pos === undefined) data.pos = 0;

	if (data.pos < arr.length) {

		if (data.localPos === undefined) data.localPos = data.pos;

		
		if (data.localPos > 0 && arr[data.localPos-1].data > arr[data.localPos].data) {
			[arr[data.localPos], arr[data.localPos-1]] = [arr[data.localPos-1], arr[data.localPos]];
			data.localPos--;
		}
		
		data.highlight.push(data.localPos-1, data.localPos)
		data.actionPoint = arr[data.localPos - 1];

		if (data.localPos <= 0 || arr[data.localPos-1].data <= arr[data.localPos].data) {
			data.pos++;
			data.localPos = undefined;
		}
	}
	else {
		data.stop = true;
	}
	return [arr, data]
}

export const bucketSort = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {
	
	if (data.stage === undefined) data.stage = 0;
	if (data.arr === undefined) data.arr = arr;

	if (data.stage === 0) {
		if (data.max === undefined) data.max = data.arr[0];
		if (data.min === undefined) data.min = data.arr[0];
		if (data.maxIndex === undefined) data.maxIndex = 0;
		if (data.minIndex === undefined) data.minIndex = 0;
		if (data.maxLoop === undefined) data.maxLoop = 1;

		data.highlight.push(data.maxLoop, data.minIndex, data.maxIndex);
		data.actionPoint = data.arr[data.maxLoop];
		
		if (data.arr[data.maxLoop].data > data.max.data) {
			data.max = data.arr[data.maxLoop];
			data.maxIndex = data.maxLoop;
		}
		if (data.arr[data.maxLoop].data < data.min.data) {
			data.min = data.arr[data.maxLoop];
			data.minIndex = data.maxLoop;
		}
		data.maxLoop++;
		if (data.maxLoop >= data.arr.length) data.stage = 1;
	}
	else if (data.stage === 1) {
		if (data.buckets === undefined) data.buckets = Array.from({length: Math.floor((data.max.data - data.min.data) / data.settings.size) + 1}, () => []);
		if (data.bucketLoop === undefined) data.bucketLoop = 0;
		
		data.highlight.push(data.bucketLoop + 1);
		data.actionPoint = data.arr[data.bucketLoop];
		
		data.buckets[Math.floor(data.arr[data.bucketLoop].data / data.max.data * (data.buckets.length - 1))].push(data.arr[data.bucketLoop]);
		data.bucketLoop++;
		
		if (data.bucketLoop >= data.arr.length) data.stage = 2;
	}
	else if (data.stage === 2) {
		if (data.sortLoop === undefined) data.sortLoop = 0;
		
		if (data.sortLoop < data.buckets.length) {
			if (data.sortIndex === undefined) data.sortIndex = 1;
		
			
			if (data.sortIndex < data.buckets[data.sortLoop].length) {
				if (data.sortPoint === undefined) data.sortPoint = data.buckets[data.sortLoop][data.sortIndex];
				if (data.sortMove === undefined) data.sortMove = data.sortIndex - 1;
				
				
				if (data.sortMove >= 0 && data.buckets[data.sortLoop][data.sortMove].data > data.sortPoint.data) {
					data.buckets[data.sortLoop][data.sortMove+1] = data.buckets[data.sortLoop][data.sortMove]
					data.sortMove--;
				}
				
				let totalIndex = 0;
				for (let i = 0; i < data.sortLoop; i++) {
					totalIndex += data.buckets[i].length;
				}
				data.highlight.push(totalIndex + data.sortMove);
				data.actionPoint = data.buckets[data.sortLoop][data.sortMove];

				if (data.sortMove < 0 || data.buckets[data.sortLoop][data.sortMove].data <= data.sortPoint.data) {
					if (data.sortPoint !== undefined) data.buckets[data.sortLoop][data.sortMove+1] = data.sortPoint;
					data.sortIndex++;
					data.sortPoint = undefined;
					data.sortMove = undefined;
				}
			}
			else {
				data.sortLoop++;
				data.sortIndex = undefined;
			}
		}
		else {
			data.stop = true;
		}

	}
	
	if (data.stage === 2) {
		arr = data.buckets.reduce((a: IDataPoint[], b: IDataPoint[]) => a.concat(b), []);
	}
	else if (data.stage === 1 && data.buckets !== undefined) {
		arr = data.buckets.reduce((a: IDataPoint[], b: IDataPoint[]) => a.concat(b), []);
		for (let i = arr.length; i < data.arr.length; i++) {
			arr.push(data.arr[i]);
		}
	}

	return [arr, data];
}

export const stoogeSort = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {
	
	if (data.stage === undefined) data.stage = 0;
	
	if (data.stage === 0) {
		if (arr[0].data > arr[arr.length - 1].data) [arr[0], arr[arr.length - 1]] = [arr[arr.length - 1], arr[0]];
		data.stage = 1;
	}
	else if (data.stage === 1) {
		if (data.nest === undefined) {
			const marker = Math.floor(arr.length / 3);
			const end = arr.length - 1;
			data.nest = [
				[0, end - marker],
				[0 + marker, end],
				[0, end - marker],
			];
		}

		if (data.nest.length === 0) {
			data.stop = true;
			return [arr, data];
		}

		const currentNest = data.nest.shift();
		

		data.highlight.push(currentNest[0], currentNest[1]);
		data.actionPoint = arr[currentNest[0]];

		if (arr[currentNest[0]].data > arr[currentNest[1]].data) {
			[arr[currentNest[0]], arr[currentNest[1]]] = [arr[currentNest[1]], arr[currentNest[0]]];
		}
		if ((currentNest[1] - currentNest[0] + 1) >= 3) {
			const marker = Math.floor((currentNest[1] - currentNest[0] + 1) / 3);
			data.nest.unshift(
				[currentNest[0], currentNest[1] - marker],
				[currentNest[0] + marker, currentNest[1]],
				[currentNest[0], currentNest[1] - marker]
			);
		}
	}

	return [arr, data];
}

export const oddEvenSort = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {

  if (data.sorted === undefined) data.sorted = false;

	if (data.sorted === undefined) data.sorted = true;
	if (data.stage === undefined) data.stage = 0;

	if (data.stage === 0) {
		if (data.loop === undefined) data.loop = 1;

		if (arr[data.loop]?.data > arr[data.loop+1]?.data) {
			[arr[data.loop], arr[data.loop+1]] = [arr[data.loop+1], arr[data.loop]];
			data.sorted = false;
		}
		data.loop += 2;
		
		if (data.loop >= arr.length) {
			data.stage = 1;
			data.loop = undefined
		}
	}
	else if (data.stage === 1) {
		if (data.loop === undefined) data.loop = 0;

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
}
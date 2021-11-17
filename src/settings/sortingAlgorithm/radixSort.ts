import { IDataPoint } from 'src/shared/interfaces';

export const name = 'Radix Sort';
export const description = 'Radix Sort starts by finding the number with the most digits. Next, the algorithm places elements into buckets based off of their first digit\'s value, now the numbers are sorted by a digit. The process is repeated with each digit.';
export const example = 'You are organizing cards by numbers and suits. You seperate them into 4 piles: clubs, spaces, dimaonds, hearts. You than seperate them into face cards and number cards to make 8 total piles. Finally, you sort them by the value of the cards.';
export const algorithm = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {
	if (!arr.length || arr.length === 1) return [arr, data];
	
	if (data.numberPosition === undefined)	{

		let largestInteger = 0;
		let largestDecimal = 0;

		for (let i = 0; i < arr.length; i++) {
			const splitData = arr[i].data.toString(data.settings.radix).split('.');
			const integer = splitData[0].length;
			const decimal = splitData[1]?.length;
			
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
			data.buckets[Math.floor(Math.abs(arr[data.evaluatingPosition].data) / Math.pow(data.settings.radix, data.position)) % data.settings.radix].push(arr[data.evaluatingPosition]);
	
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
	
	return [arr, data];
};
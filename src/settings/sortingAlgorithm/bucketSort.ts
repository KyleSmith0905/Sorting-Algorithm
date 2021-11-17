import { IDataPoint } from 'src/shared/interfaces';

export const name = 'Bucket Sort';
export const description = 'Bucket Sort places elements into buckets based on their data. The buckets are then individually sorted using another sorting algorithm.';
export const example = 'At a central warehouse for a large company, your role is to ship to other warehouses. You put boxes into "buckets" determined by the warehouses they are going to. After shipping, the other warehouses are responsible for sorting their boxes for shipping.';
export const algorithm = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {
	
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
		if (data.buckets === undefined) data.buckets = Array.from({length: Math.floor(data.settings.size + 1)}, () => []);
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
					data.buckets[data.sortLoop][data.sortMove+1] = data.buckets[data.sortLoop][data.sortMove];
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
};
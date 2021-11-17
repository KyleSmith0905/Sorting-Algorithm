import { IDataPoint } from 'src/shared/interfaces';

export const name = 'Bitonic Sort';
export const description = 'Bitonical Sort starts by grouping numbers in 2 groups, every group\'s top value is moved either to the top or bottom. Next, those groups are compared with a neighbor to sort groups of 4 by diving values by size recursively.';
export const example = 'You are running a 64-player single elimination tournament to find how good everyone is at a game. In the bracket, you start with 32 groups of 2. After a winner is decided, the winners fight another group. Enough games take place between the 2 groups to know the order of all 4 people. These battles happen with every group until a true winner is decided.';
export const algorithm = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {

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
				const l = data.loop3 ^ data.loop2;
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
			data.loop1 *= 2;
		}
	}
	else {
		data.stop = true;
	}
	
	return [arr, data];
};
import { IDataPoint } from 'src/shared/interfaces';

export const name = 'Stooge Sort';
export const description = 'Stooge Sort replaces the first and last element of an array. Than the sort uses more Stooge Sorts to sort the following in order: first 2/3rds, the last 2/3rds, and the first 2/3rds.';
export const example = 'At a accounting company with 3 employees, you decided to organize a filling cabinent that nobody ever tried to even come close to organizing. You decide to split up the labor between the other 2 employees, everyone sorts 2/3rds of it. To split the work throughout the day, you sort 2/3rds 3 times.';
export const algorithm = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {
	
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
};
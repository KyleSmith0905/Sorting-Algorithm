import { IDataPoint } from 'src/shared/interfaces';

export const name = 'Shell Sort';
export const description = 'Shell Sort sorts every Nth values (where N is a gap selected from a gap sequence) by insertion. Shell Sort starts by sorting larger gaps and closing in until it reaches a gap size of 1.';
export const example = 'After dropping a ton of important documents, you need to get them in order by noon. You laid down the papers where you can see the page numbers. You start with papers pages 1 and 302, you switch if out of order. Next you compare the next pages, 2 and 303. After ordering all the pages once, you decrease the space between numbers, you are comparing, so pages 1 and 133 next.';
export const algorithm = (arr: IDataPoint[], data: any): [IDataPoint[], any] => {

	let gaps: number[] = [];
	
	if (data.gaps === undefined) {
		switch (data.settings.gap) {
		case 'Tokuda': {
			gaps.push(1);
			let index = 1;
			while (gaps[0] < arr.length) {
				gaps.unshift(Math.ceil((9 * Math.pow(2.25, index) - 4) / 5));
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
		default: gaps = [701, 301, 132, 57, 23, 10, 4, 1];
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
				data.highlight.push(data.loop2, data.loop2 - gap);
				arr[data.loop2] = arr[data.loop2 - gap];
				data.loop2 -= gap;
			}
			else {
				data.highlight.push(data.loop2, data.loop2 - gap);
				data.loop1++;
				data.loop2 = undefined;
				data.swapPoint = undefined;
			}
			
			arr[data.loop2] = data.swapPoint;
		}
		else {
			data.highlight.push(data.loop2, data.loop2 - gap);
			data.loop1 = undefined;
			data.gapIndex++;
		}
	}
	else {
		data.stop = true;
	}

	return [arr, data];
};
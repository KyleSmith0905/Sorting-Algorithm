import { IDataPoint } from 'src/shared/interfaces';
import { graphColors, settings } from '../';

export const name = 'History Graph';
export const render = (array: IDataPoint[], canvas: HTMLCanvasElement, data: any) => {
	const graphColor = graphColors.find(e => e.name === settings.GraphColor);
	if (graphColor === undefined) return;

	const context = canvas.getContext('2d', { alpha: false });
	if (!context) return;
	context.fillStyle = '#ffffff';
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	if (data.interval === undefined) recordData(array, data);

	const highlight = [];
	const currentLocation: number[] = Array.from(Array(data.memoryArray[0].length));
	for (let i = 0; i < array.length; i++) {
		const index = array.findIndex((e) => e.id === data.reference[i]);
		if (array[i].highlight === true) highlight.push(i);
		if (index !== -1) currentLocation[i] = index;
	}

	const arrayLengthX = data.memoryArray.length;
	const arrayLengthY = data.memoryArray[0].length;
	context.lineWidth = (canvas.height - 100) / (arrayLengthY + 2);
	const halfLineWidth = context.lineWidth / 2;
	const adjustedLength = arrayLengthX + (data.interval / data.intervalLength) - 1;

	for (let i = 0; i < arrayLengthY; i++) {
		if (highlight.some((e: number) => e === currentLocation[i]) === true) context.strokeStyle = graphColor?.highlightColor();
		else context.strokeStyle = graphColor.color(data.reference.length, i, data.reference[i]);

		context.beginPath();
		let pickedUp = false;
		for (let j = 0; j < arrayLengthX; j++) {
			const point = data.memoryArray[j][i];
			if (isNaN(point) || point === -1) {
				pickedUp = true;
				continue;
			}
			else if (pickedUp === true) {
				pickedUp = false;
				context.moveTo(((j - 1) / adjustedLength) * canvas.width, (point / arrayLengthY) * canvas.height + halfLineWidth);
			}
			else if (
				data.memoryArray[j - 1] === undefined || data.memoryArray[j + 1] === undefined ||
				data.memoryArray[j - 1][i] !== -1 || data.memoryArray[j + 1][i] !== point
			) {
				context.lineTo((j / adjustedLength) * canvas.width, (point / arrayLengthY) * canvas.height + halfLineWidth);
			}
		}

		if (data.interval !== data.intervalLength) context.lineTo(canvas.width, (currentLocation[i] / arrayLengthY) * canvas.height + halfLineWidth);
		context.stroke();
	}
};
export const recordData = (array: IDataPoint[], data: any) => {
	if (data.interval === undefined) {
		data.interval = 1;
		data.intervalLength = 1;
		data.reference = array.map(e => e.id);
		data.memoryArray = [Array.from(Array(array.length).keys())];
	}
	
	data.interval = ++data.interval % data.intervalLength;
	if (data.interval === 0) {
		const currentLocation: number[] = Array.from(Array(data.memoryArray[0].length));
		for (let i = 0; i < array.length; i++) {
			const index = array.findIndex((e) => e.id === data.reference[i]);
			if (index !== -1) currentLocation[i] = index;
		}
		data.memoryArray.push(currentLocation);
	}
	if (data.memoryArray.length * data.memoryArray[0].length > 131072) {
		data.intervalLength *= 2;
		for (let i = 2; i <= data.memoryArray.length; i += 2) data.memoryArray.splice(i, 1);
	}
};
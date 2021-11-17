import { IDataPoint } from 'src/shared/interfaces';

export const name = 'History Graph';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const algorithm = (array: IDataPoint[], canvas: HTMLCanvasElement, activeColor: () => string, data: any) => {
	const context = canvas.getContext('2d');
	if (!context) return;
	const highlight: number[] = [];

	if (data.interval === undefined) {
		data.interval = 1;
		data.intervalLength = 1;
		data.reference = array.map(e => e.id);
		data.colorReference = array.map(e => e.color);
		data.memoryArray = [Array.from(Array(array.length).keys())];
	}

	const currentLocation: number[] = Array.from(Array(data.memoryArray[0].length));
	for (let i = 0; i < array.length; i++) {
		const index = array.findIndex((e) => e.id === data.reference[i]);
		if (array[i].highlight === true) highlight.push(i);
		if (index !== -1) currentLocation[i] = index;
	}

	data.interval = ++data.interval % data.intervalLength;
	if (data.interval === 0) {
		data.memoryArray.push(currentLocation);
	}
	if (data.memoryArray.length * data.memoryArray[0].length > 65536) {
		data.intervalLength *= 2;
		for (let i = 2; i <= data.memoryArray.length; i += 2) data.memoryArray.splice(i, 1);
	}

	const arrayLengthX = data.memoryArray.length;
	const arrayLengthY = data.memoryArray[0].length;
	context.lineWidth = (canvas.height - 100) / (arrayLengthY + 2);
	const halfWidth = context.lineWidth / 2;
	const adjustedLength = arrayLengthX + (data.interval / data.intervalLength) - 1;

	context.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < arrayLengthY; i++) {
		if (highlight.some(e => e === currentLocation[i]) === true) context.strokeStyle = activeColor();
		else context.strokeStyle = array[currentLocation[i]]?.color;
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
				context.moveTo(((j - 1) / adjustedLength) * canvas.width, (point / arrayLengthY) * canvas.height + halfWidth);
			}
			context.lineTo((j / adjustedLength) * canvas.width, (point / arrayLengthY) * canvas.height + halfWidth);
		}
		if (data.interval !== data.intervalCount) context.lineTo(canvas.width, (currentLocation[i] / arrayLengthY) * canvas.height + halfWidth);
		context.stroke();
		context.closePath();
	}
};
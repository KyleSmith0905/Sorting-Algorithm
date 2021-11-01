import { IDataPoint } from "./constants";

export const barGraph = (array: IDataPoint[], canvas: HTMLCanvasElement, activeColor: () => string) => {
	const context = canvas.getContext('2d');
	if (!context) return;
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	const dataLength = array.length;
	const barWidth = 1500 / dataLength + 1;
	
	for (let i = 0; i < dataLength; i++) {
		const currentPoint = array[i];
		if (currentPoint.highlight === true) context.fillStyle = activeColor();
		else context.fillStyle = currentPoint.color;
		context.fillRect((i / dataLength) * 1500, 950 - (currentPoint.height * 9.5), barWidth, (currentPoint.height * 9.5) + 50);
	}
}

export const lineGraph = (array: IDataPoint[], canvas: HTMLCanvasElement, activeColor: () => string) => {
	const context = canvas.getContext('2d');
	if (!context) return;
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	context.lineWidth = 5;

	const dataLength = array.length - 1;
	
	for (let i = 1; i < dataLength + 1; i++) {
		context.beginPath();
		const currentPoint = array[i];
		const lastPoint = array[i - 1];
		if (currentPoint.highlight === true) context.strokeStyle = activeColor();
		else context.strokeStyle = currentPoint.color;
		context.moveTo(((i - 1) / dataLength) * 1500, 1000 - (lastPoint.height * 10));
		context.lineTo((i / dataLength) * 1500, 1000 - (currentPoint.height * 10));
		context.stroke();
	}
	context.closePath();
}

export const dotGraph = (array: IDataPoint[], canvas: HTMLCanvasElement, activeColor: () => string) => {
	const context = canvas.getContext('2d');
	if (!context) return;
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	const dataLength = array.length;
	const dotSize = 1000 * Math.pow(200 + array.length, -0.8);
	
	if (dotSize > 2) {
		for (let i = 0; i < dataLength; i++) {
			const currentPoint = array[i];
			if (currentPoint.highlight === true) context.fillStyle = activeColor();
			else context.fillStyle = currentPoint.color;
			context.beginPath();
			context.ellipse(((i + 0.5) / dataLength) * 1500, 1000 - (currentPoint.height * 10), dotSize, dotSize, 0, 0, 2 * Math.PI);
			context.fill();
		}
	}
	else {
		for (let i = 0; i < dataLength; i+= 0.5) {
			const currentPoint = array[i];
			i += 0.5;
			if (currentPoint.highlight === true) context.fillStyle = activeColor();
			else context.fillStyle = currentPoint.color;
			context.beginPath();
			context.fillRect((i / dataLength) * 1500, 1000 - (currentPoint.height * 10), dotSize * 2, dotSize * 2);
		}
		
	}
	context.closePath();
}

export const colorCircle = (array: IDataPoint[], canvas: HTMLCanvasElement, activeColor: () => string) => {
	const context = canvas.getContext('2d');
	if (!context) return;
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	const circumference = Math.PI * 2;
	const dataLength = array.length;
	const offset = Math.PI * 1.5;
	
	for (let i = 0; i < dataLength; i++) {
		const currentPoint = array[i];
		if (currentPoint.highlight === true) context.fillStyle = activeColor();
		else context.fillStyle = currentPoint.color;
		context.beginPath();
		context.arc(750, 500, 500, (i / dataLength) * circumference + offset, ((i + 1) / dataLength) * circumference + 0.003 + offset);
		context.lineTo(750, 500)
		context.fill();
	}
}

export const historyGraph = (array: IDataPoint[], canvas: HTMLCanvasElement, activeColor: () => string, data: any) => {
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
	if (data.memoryArray.length * data.memoryArray[0].length > 8192) {
		data.intervalLength *= 2;
		for (let i = 2; i <= data.memoryArray.length; i += 2) data.memoryArray.splice(i, 1);
	}

	const arrayLengthX = data.memoryArray.length;
	const arrayLengthY = data.memoryArray[0].length;
	context.lineWidth = 900 / (arrayLengthY + 2);
	const halfWidth = context.lineWidth / 2;
	const adjustedLength = arrayLengthX + (data.interval / data.intervalLength) - 1;

	context.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < arrayLengthY; i++) {
		if (highlight.some(e => e === currentLocation[i]) === true) context.strokeStyle = activeColor();
		else context.strokeStyle = data.colorReference[i];
		context.beginPath();
		let pickedUp = false;
		for (let j = 0; j < arrayLengthX; j++) {
			let point;
			point = data.memoryArray[j][i];
			if (isNaN(point) || point === -1) {
				pickedUp = true;
				continue;
			}
			else if (pickedUp === true) {
				pickedUp = false;
				context.moveTo(((j - 1) / adjustedLength) * 1500, (point / arrayLengthY) * 1000 + halfWidth);
			}
			context.lineTo((j / adjustedLength) * 1500, (point / arrayLengthY) * 1000 + halfWidth);
		}
		if (data.interval !== data.intervalCount) context.lineTo(1500, (currentLocation[i] / arrayLengthY) * 1000 + halfWidth);
		context.stroke();
		context.closePath();
	}
}
import { IDataPoint } from "./dataGenerator";

export const barGraph = (array: IDataPoint[], canvas: HTMLCanvasElement) => {
	const context = canvas.getContext('2d');
	if (!context) return;
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	const dataLength = array.length;
	const barWidth = 1500 / dataLength + 1;
	
	for (let i = 0; i < dataLength; i++) {
		const currentPoint = array[i];
		context.fillStyle = currentPoint.color;
		context.fillRect((i / dataLength) * 1500, 1000 - (currentPoint.height * 10), barWidth, (currentPoint.height * 10));
	}
}

export const lineGraph = (array: IDataPoint[], canvas: HTMLCanvasElement) => {
	const context = canvas.getContext('2d');
	if (!context) return;
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	context.lineWidth = 5;

	const dataLength = array.length - 1;
	
	for (let i = 1; i < dataLength + 1; i++) {
		context.beginPath();
		const currentPoint = array[i];
		const lastPoint = array[i - 1];
		context.strokeStyle = currentPoint.color;
		context.moveTo(((i - 1) / dataLength) * 1500, 1000 - (lastPoint.height * 10));
		context.lineTo((i / dataLength) * 1500, 1000 - (currentPoint.height * 10));
		context.stroke();
	}
	context.closePath();
}

export const dotGraph = (array: IDataPoint[], canvas: HTMLCanvasElement) => {
	const context = canvas.getContext('2d');
	if (!context) return;
	context.clearRect(0, 0, canvas.width, canvas.height);

	const dataLength = array.length;
	const dotSize = 1000 * Math.pow(200 + array.length, -0.8);
	
	if (dotSize > 2) {
		for (let i = 0; i < dataLength; i+= 0.5) {
			const currentPoint = array[i];
			i += 0.5;
			context.fillStyle = currentPoint.color;
			context.beginPath();
			context.ellipse((i / dataLength) * 1500, 1000 - (currentPoint.height * 10), dotSize * 1.35, dotSize, 0, 0, 2 * Math.PI);
			context.fill();
		}
	}
	else {
		for (let i = 0; i < dataLength; i+= 0.5) {
			const currentPoint = array[i];
			i += 0.5;
			context.fillStyle = currentPoint.color;
			context.beginPath();
			context.fillRect((i / dataLength) * 1500, 1000 - (currentPoint.height * 10), dotSize * 2, dotSize * 2);
		}

	}
	context.closePath();
}
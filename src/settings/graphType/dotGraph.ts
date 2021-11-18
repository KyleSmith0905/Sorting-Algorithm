import { IDataPoint } from 'src/shared/interfaces';
import { graphColors, settings } from '../';

export const name = 'Dot Graph';
export const algorithm = (array: IDataPoint[], canvas: HTMLCanvasElement, data: any) => {
	
	const graphColor = graphColors.find(e => e.name === settings.GraphColor);
	if (graphColor === undefined) return;
	
	const context = canvas.getContext('2d');
	if (!context) return;
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	const dataLength = array.length;
	const dotSize = canvas.height * Math.pow(200 + array.length, -0.8);
	const graphYScalar = (canvas.height - (dotSize * 2)) / 100;
	
	if (dotSize > 2) {
		for (let i = 0; i < dataLength; i++) {
			const currentPoint = array[i];

			if (currentPoint.highlight === true) context.fillStyle = graphColor.highlightColor();
			else context.fillStyle = currentPoint.color;

			context.beginPath();
			context.ellipse(((i + 1) / (dataLength + 2)) * canvas.width, canvas.height - (currentPoint.height * graphYScalar) - dotSize, dotSize, dotSize, 0, 0, 2 * Math.PI);
			context.fill();
		}
	}
	else {
		for (let i = 0; i < dataLength; i+= 0.5) {
			const currentPoint = array[i];
			i += 0.5;
			
			if (currentPoint.highlight === true) context.fillStyle = graphColor.highlightColor();
			else context.fillStyle = currentPoint.color;

			context.beginPath();
			context.fillRect((i / dataLength) * canvas.width, canvas.height - (currentPoint.height * graphYScalar), dotSize * 2, dotSize * 2);
		}
	}
	context.closePath();
};

export const colorCircle = (array: IDataPoint[], canvas: HTMLCanvasElement, activeColor: () => string) => {
	const context = canvas.getContext('2d');
	if (!context) return;
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	const circumference = Math.PI * 2;
	const dataLength = array.length;
	const offset = Math.PI * 1.5;
	const radiusX = canvas.width / 2;
	const radiusY = canvas.height / 2;

	for (let i = 0; i < dataLength; i++) {
		const currentPoint = array[i];
		if (currentPoint.highlight === true) context.fillStyle = activeColor();
		else context.fillStyle = currentPoint.color;
		context.beginPath();
		context.arc(radiusX, radiusY, radiusY, (i / dataLength) * circumference + offset, ((i + 1) / dataLength) * circumference + 0.003 + offset);
		context.lineTo(radiusX, radiusY);
		context.fill();
	}
};
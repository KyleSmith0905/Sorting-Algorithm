import { IDataPoint } from 'src/shared/interfaces';
import { graphColors, settings } from '../';

export const name = 'Circle Graph';
export const render = (array: IDataPoint[], canvas: HTMLCanvasElement, data: any) => {
		
	const graphColor = graphColors.find(e => e.name === settings.GraphColor);
	if (graphColor === undefined) return;
	
	const context = canvas.getContext('2d', { alpha: false });
	if (!context) return;
	context.fillStyle = '#ffffff';
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	const circumference = Math.PI * 2;
	const dataLength = array.length;
	const offset = Math.PI * 1.5;
	const radiusX = canvas.width / 2;
	const radiusY = canvas.height / 2;

	for (let i = 0; i < dataLength; i++) {
		const currentPoint = array[i];
		if (currentPoint.highlight === true) context.fillStyle = graphColor.highlightColor();
		else context.fillStyle = currentPoint.color;
		context.beginPath();
		context.arc(radiusX, radiusY, radiusY, (i / dataLength) * circumference + offset, ((i + 1) / dataLength) * circumference + 0.003 + offset);
		context.lineTo(radiusX, radiusY);
		context.fill();
	}
};
export const recordData = () => null;
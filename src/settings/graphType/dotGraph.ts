import { IDataPoint } from 'src/shared/interfaces';
import { graphColors, settings } from '../';

export const name = 'Dot Graph';
export const render = (array: IDataPoint[], canvas: HTMLCanvasElement, data: any) => {
	
	const graphColor = graphColors.find(e => e.name === settings.GraphColor);
	if (graphColor === undefined) return;
	
	const context = canvas.getContext('2d', { alpha: false });
	if (!context) return;
	context.fillStyle = '#ffffff';
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	const dataLength = array.length;
	const dotSize = Math.round(canvas.height * Math.pow(200 + array.length, -0.8) * 2) / 2;
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
			context.fillRect(
				Math.round((i / dataLength) * canvas.width),
				Math.round(canvas.height - (currentPoint.height * graphYScalar)),
				dotSize * 2,
				dotSize * 2
			);
		}
	}
	context.closePath();
};
export const recordData = () => null;
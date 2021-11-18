import { IDataPoint } from 'src/shared/interfaces';
import { graphColors, settings } from '../';

export const name = 'Line Graph';
export const algorithm = (array: IDataPoint[], canvas: HTMLCanvasElement, data: any) => {
		
	const graphColor = graphColors.find(e => e.name === settings.GraphColor);
	if (graphColor === undefined) return;
	
	const context = canvas.getContext('2d');
	if (!context) return;
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	context.lineWidth = (canvas.height + 100) / (array.length);

	const dataLength = array.length - 1;
	const graphYScalar = canvas.height / 100;
	
	for (let i = 1; i < dataLength + 1; i++) {
		context.beginPath();
		const currentPoint = array[i];
		const lastPoint = array[i - 1];
		if (currentPoint.highlight === true) context.strokeStyle = graphColor.highlightColor();
		else context.strokeStyle = currentPoint.color;

		context.moveTo(((i - 1) / dataLength) * canvas.width, canvas.height - (lastPoint.height * graphYScalar));
		context.lineTo((i / dataLength) * canvas.width, canvas.height - (currentPoint.height * graphYScalar));
		context.stroke();
	}
	context.closePath();
};
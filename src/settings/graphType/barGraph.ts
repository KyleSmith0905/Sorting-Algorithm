import { IDataPoint } from 'src/shared/interfaces';
import { graphColors, settings } from '../';

export const name = 'Bar Graph';
export const render = (array: IDataPoint[], canvas: HTMLCanvasElement, data: any) => {
		
	const graphColor = graphColors.find(e => e.name === settings.GraphColor);
	if (graphColor === undefined) return;
	
	const context = canvas.getContext('2d', { alpha: false });
	if (!context) return;
	context.fillStyle = '#ffffff';
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	const dataLength = array.length;
	const barWidth = Math.round(canvas.width / dataLength + 1);
	const graphYScalar = (canvas.height - 50) / 100;

	for (let i = 0; i < dataLength; i++) {
		const currentPoint = array[i];
		if (currentPoint.highlight === true) context.fillStyle = graphColor.highlightColor();
		else context.fillStyle = currentPoint.color;
		
		context.fillRect(
			Math.round((i / dataLength) * canvas.width),
			Math.round(canvas.height - 50 - (currentPoint.height * graphYScalar)),
			barWidth,
			Math.round(currentPoint.height * graphYScalar) + 50
		);
	}
};
export const recordData = () => null;
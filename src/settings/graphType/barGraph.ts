import { IDataPoint } from 'src/shared/interfaces';

export const name = 'Bar Graph';
export const algorithm = (array: IDataPoint[], canvas: HTMLCanvasElement, activeColor: () => string) => {
	const context = canvas.getContext('2d');
	if (!context) return;
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	const dataLength = array.length;
	const barWidth = canvas.width / dataLength + 1;
	const graphYScalar = (canvas.height - 50) / 100;

	for (let i = 0; i < dataLength; i++) {
		const currentPoint = array[i];
		if (currentPoint.highlight === true) context.fillStyle = activeColor();
		else context.fillStyle = currentPoint.color;
		
		context.fillRect((i / dataLength) * canvas.width, canvas.height - 50 - (currentPoint.height * graphYScalar), barWidth, (currentPoint.height * graphYScalar) + 50);
	}
};
export const sineHSVToHex = (hue: number, saturation: number, value: number): string => {
	
	const hueTransform = (-Math.PI * (hue % 360)) / 180 + Math.PI;
	const saturationScalar = saturation * (128 / 100);
	const saturationTransform = saturation * (-128 / 100) + 256;
	const valueScalar = value / 100;

	const HSVtoElement = (offset: number): number => {
		let element = Math.floor((Math.sin(hueTransform + (Math.PI * offset)) * saturationScalar + saturationTransform) * valueScalar);
		if (element > 255) element = 255;
		else if (element < 0) element = 0;
		return element;
	};

	const elementToHex = (element: number): string => {
		return Math.floor(element).toString(16).padStart(2, '0');
	};
		
	const r = HSVtoElement(3/2);
	const g = HSVtoElement(1/6);
	const b = HSVtoElement(5/6);


	return '#' + elementToHex(r) + elementToHex(g) + elementToHex(b);
};
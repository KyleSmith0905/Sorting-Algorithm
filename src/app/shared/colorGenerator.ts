export const rainbowColor = (index: number, totalArray: number) => {
	return sineHSVToHex((index / totalArray) * 360, 100, 100)
}

export const rainbowActive = () => {
	return '#ffffff'
}

export const grayColor = (index: number, totalArray: number) => {
	const grayHex = Math.floor((index / totalArray) * 255).toString(16).padStart(2, '0');
	return '#' + grayHex + grayHex + grayHex;
}

export const grayActive = () => {
	return '#ff0000';
}

export const monoColor = () => {
	return '#ff0000';
}

export const monoActive = () => {
	return '#ffffff';
}

export const reverseColor = (_: number, totalArray: number, position: number) => {
	return sineHSVToHex((position / totalArray) * 360, 100, 100);
}

export const reverseActive = () => {
	return '#ffffff';
}

const sineHSVToHex = (hue: number, saturation: number, value: number): string => {
	
	const hueTransform = (-Math.PI * (hue % 360)) / 180 + Math.PI;
	const saturationScalar = saturation * (128/100);
	const saturationTransform = saturation * (-128 / 100) + 256;
	const valueScalar = value / 100;

	const HSVtoElement = (offset: number): number => {
		let element = Math.floor((Math.sin(hueTransform + (Math.PI * offset)) * saturationScalar + saturationTransform) * valueScalar);
		if (element > 255) element = 255;
		else if (element < 0) element = 0;
		return element;
	}

	const elementToHex = (element: number): string => {
		return Math.floor(element).toString(16).padStart(2, '0');
	}
	
	const r = HSVtoElement(3/2);
	const g = HSVtoElement(1/6);
	const b = HSVtoElement(5/6);


	return '#' + elementToHex(r) + elementToHex(g) + elementToHex(b);
}
export interface IDataPoint {
	color: string;
	height: number;
	data: number;
	id: number;
	highlight?: boolean;
}

export interface ISortingAlgorithm {
	algorithm: (arr: IDataPoint[], data: unknown) => [IDataPoint[], unknown];
	name: string;
	description: string;
	example: string;
}

export interface ISampleType {
	algorithm: (numbers: number[], index: number, totalLength: number) => [number, number];
	name: string;
}

export interface ISoundType {
	algorithm: (data: number, oscillator: OscillatorNode) => void
	name: string;
}

export interface IGraphColor {
	color: (index: number, totalArray: number, position: number) => string;
	colorActive: () => string;
	name: string;
}

export interface IGraphType {
	algorithm: (array: IDataPoint[], canvas: HTMLCanvasElement, activeColor: () => string, data: unknown) => void;
	name: string;
}

import { IDataPoint } from './interfaces';
import { graphColors, graphTypes, settings } from '../settings';

/**
 * Renders the graph's canvas element.
 * @param {IDataPoint[]} coordinates - The coordinates's of the graph.
 */
export const RenderGraph = (coordinates: IDataPoint[] | undefined, graphData?: any) => {
	if (coordinates === undefined) return;
	const graph = <HTMLCanvasElement>document.getElementById('DataGraph');

	const graphTypeFunction = graphTypes.find(e => e.name === settings.GraphType)?.algorithm;
	const graphColorActiveFunction = graphColors.find(e => e.name === settings.GraphColor)?.highlightColor;

	if (graphTypeFunction === undefined || graphColorActiveFunction === undefined || graph === undefined) return;

	graphTypeFunction(coordinates, graph, graphColorActiveFunction, graphData ?? {});
};
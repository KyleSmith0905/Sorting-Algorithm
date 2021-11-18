import { IDataPoint } from './interfaces';
import { graphTypes, settings } from '../settings';

/**
 * Renders the graph's canvas element.
 * @param {IDataPoint[]} coordinates - The coordinates's of the graph.
 */
export const RenderGraph = (coordinates: IDataPoint[] | undefined, graphData?: any) => {
	if (coordinates === undefined) return;

	const graph = <HTMLCanvasElement>document.getElementById('DataGraph');
	const graphType = graphTypes.find(e => e.name === settings.GraphType);

	if (graphType === undefined || graph === undefined) return;

	graphType.algorithm(coordinates, graph, graphData ?? {});
};
import { IDataPoint } from './interfaces';
import { graphTypes, settings } from '../settings';

let lastRender = Date.now();
let backupGraphData: any;
type renderAction = 'regularRender' | 'mustRender';

/**
 * Renders the graph's canvas element.
 * @param {IDataPoint[]} coordinates - The coordinates's of the graph.
 * @param {string} action - Whether or not to record the data.
 * @param {any} GraphData - Persistant data used by the graph.
 */
export const RenderGraph = (coordinates: IDataPoint[] | undefined, action: renderAction, graphData?: any) => {
	const graphType = graphTypes.find(e => e.name === settings.GraphType);
	if (coordinates === undefined || graphType === undefined) return;

	if (action === 'regularRender') graphType.recordData(coordinates, graphData);

	// Only render the image 30 times a second unless required.
	if (Date.now() - lastRender < 33 && action !== 'mustRender') return;
	if (graphData !== undefined) backupGraphData = graphData;

	lastRender = Date.now();
	const graph = <HTMLCanvasElement>document.getElementById('DataGraph');

	if (graph) graphType.render(coordinates, graph, graphData ?? backupGraphData);
};
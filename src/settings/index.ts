import graphColors from './graphColor/_index';
import graphTypes from './graphType/_index';
import sampleTypes from './sampleType/_index';
import sampleOrders from './sampleOrder/_index';
import sortingAlgorithms from './sortingAlgorithm/_index';
import soundTypes from './soundType/_index';

export { graphColors, graphTypes, sampleOrders, sampleTypes, sortingAlgorithms, soundTypes};

export const settings = {
	SortingAlgorithm: 'Quick Sort',
	SortSpeed: 4,
	SampleSize: 256,
	GraphType: 'Bar Graph',
	GraphColor: 'Rainbow',
	SampleType: 'Linear',
	SampleOrder: 'Random',
	SoundType: 'Default',
	SoundVolume: 0.5,
	ShowSweeper: true,

	RadixSortBy: 'LSD',
	RadixSortRadix: 2,
	ShellSortGap: 'Ciura',
	BucketSortSize: 8,
	SampleSortSize: 8,
};

export const defaultSettings = {
	SortingAlgorithm: sortingAlgorithms[Math.floor(Math.random() * sortingAlgorithms.length)].name,
	SortSpeed: 1,
	SampleSize: 8,
	GraphType: graphTypes.findIndex(e => e.name === 'History Graph'),
	GraphColor: graphColors.findIndex(e => e.name === 'Rainbow'),
	SampleType: sampleTypes.findIndex(e => e.name === 'Linear'),
	SampleOrder: sampleOrders.findIndex(e => e.name === 'Random'),
	SoundType: soundTypes.findIndex(e => e.name === 'Normal'),
	SoundVolume: 0.5,
	ShowSweeper: 1,
	
	RadixSortBy: 1,
	RadixSortRadix: 2,
	ShellSortGap: 2,
	BucketSortSize: 8,
	SampleSortSize: 8,
};
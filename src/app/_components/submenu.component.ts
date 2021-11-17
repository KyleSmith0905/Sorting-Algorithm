import { Component, Input } from '@angular/core';
import { graphColors, graphTypes, sampleTypes, settings, soundTypes } from 'src/settings';
import { SetCookie } from 'src/shared/cookies';
import { IDataPoint } from 'src/shared/interfaces';
import { RenderGraph } from 'src/shared/renderGraph';

@Component({
	selector: 'component-submenu',
	templateUrl: './submenu.component.html',
})
export class submenuComponent {
	@Input() Coordinates: IDataPoint[] | undefined;
	
	SetSpeed(object: Event | number) {
		if (typeof object !== 'number') {
			object = (<HTMLInputElement>object.currentTarget).valueAsNumber;
			SetCookie('SortSpeed', object.toString());
		}
		if (object >= 3) object = Math.round(Math.pow(2, object));
		else object = Math.round(Math.pow(2, object) * 10) / 10;
		
		const textElement = document.getElementById('SortSpeedText');
		if (textElement instanceof HTMLElement) textElement.innerText = 'Sorting Speed: ' + object + 'ms';
		settings.SortSpeed = object;
	}
	
	SetSample(object: Event | number) {
		if (typeof object !== 'number') {
			object = (<HTMLInputElement>object.currentTarget).valueAsNumber;
			SetCookie('SampleSize', object.toString());
		}
		const val = Math.round(Math.pow(2, object));
		
		const textElement = document.getElementById('SampleSizeText');
		if (textElement instanceof HTMLElement) textElement.innerText = 'Sample Size: ' + val;
		settings.SampleSize = val;
	}
	
	SetGraphType(object: Event | number) {
		if (typeof object !== 'number') {
			object = (<HTMLInputElement>object.currentTarget).valueAsNumber;
			SetCookie('GraphType', object.toString());
		}
		const index = Math.round(object);
		const val = graphTypes[index]?.name;
		settings.GraphType = val;
		
		const textElement = document.getElementById('GraphTypeText');
		if (textElement instanceof HTMLElement) textElement.innerText = 'Graph Type: ' + val;
		RenderGraph(this.Coordinates);
	}
	
	SetGraphColor(object: Event | number) {
		if (typeof object !== 'number') {
			object = (<HTMLInputElement>object.currentTarget).valueAsNumber;
			SetCookie('GraphColor', object.toString());
		}
		const index = Math.round(object);
		const val = graphColors[index]?.name;
		settings.GraphColor = val;
		
		const data: Array<IDataPoint & { index?: number }> | undefined = this.Coordinates;
		if (data === undefined) return;
		const dataLength = data.length;
		
		for (let i = 0; i < dataLength; i++) {
			data[i].index = i;
		}
		data.sort((a, b) => a.id - b.id);
		for (let i = 0; i < dataLength; i++) {
			data[i].color = graphColors[index].color(i, dataLength, data[i].index ?? i);
		}
		data.sort((a, b) => {
			if (a.index !== undefined && b.index !== undefined) return a.index - b.index;
			return 0;
		});
		
		RenderGraph(this.Coordinates);
		
		const textElement = document.getElementById('GraphColorText');
		if (textElement instanceof HTMLElement) textElement.innerText = 'Graph Color: ' + val;
	}
	
	SetShowSweeper(object: Event | number) {
		if (typeof object !== 'number') {
			object = (<HTMLInputElement>object.currentTarget).valueAsNumber;
			SetCookie('ShowSweeper', object.toString());
		}
		const val = Boolean(object);
		settings.ShowSweeper = val;
		
		const textElement = document.getElementById('ShowSweeperText');
		if (textElement instanceof HTMLElement) textElement.innerText = 'Show Sweeper: ' + val;
	}
	
	SetSampleType(object: Event | number) {
		if (typeof object !== 'number') {
			object = (<HTMLInputElement>object.currentTarget).valueAsNumber;
			SetCookie('SampleType', object.toString());
		}
		const val = sampleTypes[Math.round(object)].name;
		settings.SampleType = val;
		
		const textElement = document.getElementById('SampleTypeText');
		if (textElement instanceof HTMLElement) textElement.innerText = 'Sample Type: ' + val;
	}
	
	SetSoundType(object: Event | number) {
		if (typeof object !== 'number') {
			object = (<HTMLInputElement>object.currentTarget).valueAsNumber;
			SetCookie('SoundType', object.toString());
		}
		const index = Math.round(object);
		const val = soundTypes[index].name;
		settings.SoundType = val;
		
		const textElement = document.getElementById('SoundTypeText');
		if (textElement instanceof HTMLElement) textElement.innerText = 'Sound Type: ' + val;
	}
	
	SetSoundVolume(object: Event | number) {
		if (typeof object !== 'number') {
			object = (<HTMLInputElement>object.currentTarget).valueAsNumber;
			SetCookie('SoundVolume', object.toString());
		}
		const val = Math.round(Math.pow(object, 2) * 100) / 100;
		settings.SoundVolume = val;
		
		const textElement = document.getElementById('SoundVolumeText');
		if (textElement instanceof HTMLElement) textElement.innerText = 'Sound Volume: ' + val;
	}
	
	SetRadixSortBy(object: Event | number) {
		if (typeof object !== 'number') {
			object = (<HTMLInputElement>object.currentTarget).valueAsNumber;
			SetCookie('RadixSortBy', object.toString());
		}
		const val = ['MSD', 'LSD'][object];
		settings.RadixSortBy = val;
		
		const textElement = document.getElementById('RadixSortByText');
		if (textElement instanceof HTMLElement) textElement.innerText = 'Sort By: ' + val;
	}
	
	SetRadixSortRadix(object: Event | number) {
		if (typeof object !== 'number') {
			object = (<HTMLInputElement>object.currentTarget).valueAsNumber;
			SetCookie('RadixSortRadix', object.toString());
		}
		const val = Math.round(object);
		settings.RadixSortRadix = val;
		
		const textElement = document.getElementById('RadixSortRadixText');
		if (textElement instanceof HTMLElement) textElement.innerText = 'Radix: ' + val;
	}
	
	SetShellSortGap(object: Event | number) {
		if (typeof object !== 'number') {
			object = (<HTMLInputElement>object.currentTarget).valueAsNumber;
			SetCookie('ShellSortGap', object.toString());
		}
		const val = ['Ciura', 'Shell', 'Hibbard', 'Tokuda'][object];
		settings.ShellSortGap = val;
		
		const textElement = document.getElementById('ShellSortGapText');
		if (textElement instanceof HTMLElement) textElement.innerText = 'Gap: ' + val;
	}
	
	SetBucketSortSize(object: Event | number) {
		if (typeof object !== 'number') {
			object = (<HTMLInputElement>object.currentTarget).valueAsNumber;
			SetCookie('BucketSortSize', object.toString());
		}
		const val = Math.round(object);
		settings.BucketSortSize = val;
		
		const textElement = document.getElementById('BucketSortSizeText');
		if (textElement instanceof HTMLElement) textElement.innerText = 'Bucket Size: ' + val;
	}
	
	SetSampleSortSize(object: Event | number) {
		if (typeof object !== 'number') {
			object = (<HTMLInputElement>object.currentTarget).valueAsNumber;
			SetCookie('SampleSortSize', object.toString());
		}
		const val = Math.round(object);
		settings.SampleSortSize = val;
		
		const textElement = document.getElementById('SampleSortSizeText');
		if (textElement instanceof HTMLElement) textElement.innerText = 'Bucket Size: ' + val;
	}
}
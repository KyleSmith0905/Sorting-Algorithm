import { Component } from '@angular/core';
import { GetCookie, SetCookie } from '../../shared/cookies';
import { IDataPoint } from '../../shared/interfaces';
import { sortGraph } from '../../shared/sortGraph';
import { RenderGraph } from '../../shared/renderGraph';
import { defaultSettings, settings } from '../../settings';

@Component({
	selector: 'home-page',
	templateUrl: './home.component.html',
})
export class HomeComponent {
	SortingAlgorithm = settings.SortingAlgorithm;

	SortingInterval: number | undefined;
	ErrorMessage: string | undefined;
	Coordinates: IDataPoint[] | undefined;
	Oscillator: OscillatorNode | undefined;
	SortingSettingsMenu = false;
	
	ngOnDestroy() {
		if (this.SortingInterval !== undefined) window.clearInterval(this.SortingInterval);
		if (this.Oscillator !== undefined) this.Oscillator.stop();
	}

	ngOnInit() {
		this.onResize();
		
		const setInput = (setting: string, fallback: number) => {
			const cookie = GetCookie(setting) ?? fallback;
			if (setting === 'GraphColor') console.log(cookie);
			(<HTMLInputElement>document.getElementById(setting)).setAttribute('value', cookie.toString());
			(<HTMLInputElement>document.getElementById(setting)).dispatchEvent(new Event('input'));
		};
    
		settings.SortingAlgorithm = GetCookie('SortingAlgorithm') ?? settings.SortingAlgorithm;
		this.SortingAlgorithm = settings.SortingAlgorithm;
		setInput('SortSpeed', defaultSettings.SortSpeed);
		setInput('SampleSize', defaultSettings.SampleSize);
		setInput('GraphType', defaultSettings.GraphType);
		setInput('GraphColor', defaultSettings.GraphColor);
		setInput('SampleType', defaultSettings.SampleType);
		setInput('SampleOrder', defaultSettings.SampleOrder);
		setInput('SoundType', defaultSettings.SoundType);
		setInput('SoundVolume', defaultSettings.SoundVolume);
		setInput('ShowSweeper', defaultSettings.ShowSweeper);
		setInput('RadixSortBy', defaultSettings.RadixSortBy);
		setInput('RadixSortRadix', defaultSettings.RadixSortRadix);
		setInput('ShellSortGap', defaultSettings.ShellSortGap);
		setInput('BucketSortSize', defaultSettings.BucketSortSize);
		setInput('SampleSortSize', defaultSettings.SampleSortSize);
		
		sortGraph(this);
	}
	
	onResize() {
		const graph = <HTMLCanvasElement>document.getElementById('DataGraph');
		if (graph === null) return;
		if (window.innerWidth > 820) {
			let windowWidth = window.innerWidth;
			if (windowWidth > 1200) windowWidth = 1200;
			const width = Math.round(50 + (windowWidth * 0.37)) + 'px';
			if (graph.style.width === width) return;
			graph.style.width = width;
			graph.width = parseFloat(width);
			RenderGraph(this.Coordinates);
		}
		else {
			graph.width = window.innerWidth * 0.8;
			RenderGraph(this.Coordinates);
			if (graph.style.width === '80%') return;
			graph.style.width = '80%';
		}
	}
  
	ResetGraph = () => {
		if (this.SortingInterval !== undefined) window.clearInterval(this.SortingInterval);
    
		sortGraph(this);
	};
}
import { Component } from '@angular/core';
import { DataGenerator } from './shared/dataGenerator';
import { AlgorithmDescriptions, AlgorithmExamples, AlgorithmFunctions, AlgorithmNames, GraphColorFunctions, GraphColorActiveFunctions, GraphColors, GraphTypeFunctions, GraphTypes, IDataPoint, SampleTypeFunctions, SampleTypes, SoundTypes, SoundTypeFunctions } from './shared/constants';
import { getCookie, setCookie } from './shared/cookies';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  SelectingAlgorithm = false;

  SortingAlgorithm = AlgorithmNames[Math.floor(Math.random() * AlgorithmNames.length)];
  SortSpeed = 4;
  SampleSize = 256;
  GraphType = 'Bar Graph';
  GraphColor = 'Rainbow';
  SampleType = 'Linear';
  SoundType = 'Default';
  SoundVolume = 0.5;
  ShowSweeper = true;

  RadixSortBy = 'LSD';
  RadixSortRadix = 2;
  ShellSortGap = 'Ciura';
  BucketSortSize = 8;

  AlgorithmDescription = AlgorithmDescriptions[0];
  AlgorithmExample = AlgorithmExamples[0];
  
  SortingInterval: number | undefined;
  ErrorMessage: string | undefined;
  Data: IDataPoint[] | undefined;
  Oscillator: OscillatorNode | undefined;

  BottomMenu = 1;
  SortingSettingsMenu = false;
  
  sortGraph = () => {

    this.Data = DataGenerator(
      this.SampleSize,
      GraphColorFunctions[GraphColors.indexOf(this.GraphColor)],
      SampleTypeFunctions[SampleTypes.indexOf(this.SampleType)]
    );

    let data: any = {};
    let graphData: any = {};
    data.settings = {};
    data.settings.sortingSpeed = this.SortSpeed;
    graphData.settings = {};
    switch (this.SortingAlgorithm) {
      case 'Radix Sort': {
        data.settings.radix = this.RadixSortRadix;
        data.settings.sortBy = this.RadixSortBy;
        break;
      }
      case 'Shell Sort': {
        data.settings.gap = this.ShellSortGap;
        break;
      }
      case 'Bucket Sort': {
        data.settings.size = this.BucketSortSize;
        break;
      }
    }
    switch (this.GraphType) {
      case 'History Graph': {
        graphData.settings.sampleSize = this.SampleSize;
      }
    }

    this.ErrorMessage = undefined;
    const canvas = <HTMLCanvasElement>document.getElementById('DataGraph');
    
    let graphTypeFunction = GraphTypeFunctions[GraphTypes.indexOf(this.GraphType)];
    let graphColorActiveFunction = GraphColorActiveFunctions[GraphColors.indexOf(this.GraphColor)];
    graphTypeFunction(this.Data, canvas, graphColorActiveFunction, graphData);

    const sortingAlgorithm = AlgorithmFunctions[AlgorithmNames.indexOf(this.SortingAlgorithm)];
    this.AlgorithmDescription = AlgorithmDescriptions[AlgorithmNames.indexOf(this.SortingAlgorithm)];
    this.AlgorithmExample = AlgorithmExamples[AlgorithmNames.indexOf(this.SortingAlgorithm)];

    let speedPass = 1;
    let speed = this.SortSpeed;
    if (speed <= 0) speed = 4;
    while (speed < 4) {
      speed *= 2;
      speedPass++;
    }

    let lowestValue = Number.POSITIVE_INFINITY;
    let highestValue = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < this.Data.length; i++) {
      if (lowestValue > this.Data[i].data) lowestValue = this.Data[i].data;
      if (highestValue < this.Data[i].data) highestValue = this.Data[i].data;
    }
    let conversionScale = 1 / (highestValue - lowestValue)
    let conversionShift = -lowestValue 

    this.Oscillator?.stop();
    const audioContext = new AudioContext();
    this.Oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    this.Oscillator.frequency.value = 0;
    this.Oscillator.connect(gain).connect(audioContext.destination);
    this.Oscillator.start();
    
    this.SortingInterval = window.setInterval(() => {
      
      let graphTypeFunction = GraphTypeFunctions[GraphTypes.indexOf(this.GraphType)];
      let graphColorActiveFunction = GraphColorActiveFunctions[GraphColors.indexOf(this.GraphColor)];

      if (this.Data === undefined) {
        this.ErrorMessage = 'Error: There is not enough valid data points to sort.';
        this.Oscillator?.stop();
        window.clearInterval(this.SortingInterval);
        return;
      }
      
      if (data.stop == true && this.SortingInterval !== undefined) {
        if (isArraySorted(this.Data) === false) {
          if (typeof data.error === 'string') this.ErrorMessage = 'Error: ' + data.error
          else this.ErrorMessage = 'Error: ' + this.SortingAlgorithm + ' left your data unsorted.';
        }
        this.Oscillator?.stop();
        graphData.done = true;
        graphTypeFunction(this.Data, canvas,graphColorActiveFunction, graphData);
        window.clearInterval(this.SortingInterval);
        return;
      }
      
      data.highlight = [];
      for (let i = 0; i < speedPass; i++) {
        [this.Data, data] = sortingAlgorithm(this.Data, data);
      }
      
      if (data.actionPoint !== undefined && this.Oscillator !== undefined) {
        gain.gain.value = this.SoundVolume;
        const soundTypeFunctions = SoundTypeFunctions[SoundTypes.indexOf(this.SoundType)];
        soundTypeFunctions(conversionScale * data.actionPoint.data + conversionShift, this.Oscillator);
      }
      data.actionPoint = undefined;
      
      if (this.ShowSweeper === false) data.highlight = [];

      for (let i = 0; i < data.highlight.length; i++) {
        if (this.Data[data.highlight[i]] === undefined) continue;
        this.Data[data.highlight[i]].highlight = true;
      }
      
      graphTypeFunction(this.Data, canvas, graphColorActiveFunction, graphData);
      
      for (let i = 0; i < data.highlight.length; i++) {
        if (this.Data[data.highlight[i]] === undefined) continue;
        delete this.Data[data.highlight[i]].highlight;
      }
    }, speed);
  }

  ngOnInit() {
    this.SortingAlgorithm = getCookie('SortingAlgorithm') ?? this.SortingAlgorithm;
    this.SortSpeed = Number(getCookie('SortSpeed')) ?? this.SortSpeed;
    this.SampleSize = Number(getCookie('SampleSize')) ?? this.SampleSize;
    this.GraphType = getCookie('GraphType') ?? this.GraphType;
    this.GraphColor = getCookie('GraphColor') ?? this.GraphColor;
    this.SampleType = getCookie('SampleType') ?? this.SampleType;
    this.SoundType = getCookie('SoundType') ?? this.SoundType;
    this.SoundVolume = Number(getCookie('SoundVolume')) ?? this.SoundVolume;
    this.ShowSweeper = getCookie('ShowSweeper') === 'true' ?? this.ShowSweeper;
    this.RadixSortBy = getCookie('RadixSortBy') ?? this.RadixSortBy;
    this.RadixSortRadix = Number(getCookie('RadixSortRadix')) ?? this.RadixSortRadix;
    this.ShellSortGap = getCookie('ShellSortGap') ?? this.ShellSortGap;
    this.BucketSortSize = Number(getCookie('BucketSortSize')) ?? this.BucketSortSize;

    this.sortGraph();
  }

  ResetGraph = () => {
    if (this.SortingInterval !== undefined) window.clearInterval(this.SortingInterval);
    
    this.sortGraph();
  }

  ShowAlgorithmList() {
    this.SelectingAlgorithm = !this.SelectingAlgorithm;
    if (window.scrollY > 53) window.scrollTo({top: 0, behavior: 'smooth'});
  }

  ShowMenu(object: MouseEvent) {
    const topTarget = <HTMLElement>object.currentTarget;
    const pathTarget = <SVGPathElement>topTarget.childNodes[1].childNodes[0];
    
    const isCollapsed = topTarget.getAttribute('collapsed') === 'true';
    
    let childs = topTarget.parentElement?.children;
    if (childs) {
      for (let i = 0; i < childs.length; i++) {
        const child = childs[i];
        if (child.isSameNode(topTarget)) continue;
        child.setAttribute('collapsed', 'true');
        const pathTarget = <SVGPathElement>child?.childNodes[1].childNodes[0];
        if (pathTarget) pathTarget.setAttribute('d', 'M 5,25 L 5,5 L 45,5 L 45,25');
      }
    }

    pathTarget.setAttribute('d', isCollapsed === false ? 'M 5,25 L 5,5 L 45,5 L 45,25' : 'M 5,5 L 25,20 L 25,20 L 45,5');
    topTarget.setAttribute('collapsed', (!isCollapsed).toString());

    if (isCollapsed === false) this.BottomMenu = 0;
    else if (topTarget.parentNode) this.BottomMenu = Array.from(topTarget?.parentNode?.children).indexOf(topTarget) + 1;
  }
  
  SetSort(val: string) {
    this.SortingAlgorithm = val;
    setCookie('SortingAlgorithm', val);
    this.SelectingAlgorithm = false;
    if (this.SortingInterval !== undefined) window.clearInterval(this.SortingInterval);
    this.sortGraph();
  }
  
  SetSpeed(object: Event) {
    const target = <HTMLInputElement>object.currentTarget;
    let val = target.valueAsNumber;
    if (val >= 3) val = Math.round(Math.pow(2, val));
    else val = Math.round(Math.pow(2, val) * 10) / 10;
    this.SortSpeed = val;
    setCookie('SortSpeed', val.toString());
  }
  
  SetSample(object: Event) {
    const target = <HTMLInputElement>object.currentTarget;
    const val = Math.round(Math.pow(2, target.valueAsNumber))
    this.SampleSize = val;
    setCookie('SampleSize', val.toString());
  }

  SetGraphType(object: Event) {
    const target = <HTMLInputElement>object.currentTarget;
    const index = Math.round(target.valueAsNumber);
    const val = GraphTypes[index];
    this.GraphType = val;
    setCookie('GraphType', val);

    const graphColorActiveFunction = GraphColorActiveFunctions[GraphColors.indexOf(this.GraphColor)];
    const canvas = <HTMLCanvasElement>document.getElementById('DataGraph');
    if (this.Data) GraphTypeFunctions[index](this.Data, canvas, graphColorActiveFunction, {});
  }
  
  SetGraphColor(object: Event) {
    const target = <HTMLInputElement>object.currentTarget;
    const index = Math.round(target.valueAsNumber);
    const val = GraphColors[index];
    this.GraphColor = val;
    setCookie('GraphColor', val);

    if (this.Data === undefined) return;
    const data: Array<IDataPoint & { index?: number }> = this.Data;
    const dataLength = this.Data.length;

    for (let i = 0; i < dataLength; i++) {
      data[i].index = i;
    }
    data.sort((a, b) => a.id - b.id);
    for (let i = 0; i < dataLength; i++) {
      data[i].color = GraphColorFunctions[index](i, dataLength, data[i].index ?? i);
    }
    data.sort((a, b) => {
      if (a.index !== undefined && b.index !== undefined) return a.index - b.index
      return 0;
    })

    const graphTypeFunction = GraphTypeFunctions[index];
    const graphColorActiveFunction = GraphColorActiveFunctions[index];

    const canvas = <HTMLCanvasElement>document.getElementById('DataGraph');
    if (this.Data) graphTypeFunction(this.Data, canvas, graphColorActiveFunction, {});
  }

  SetShowSweeper(object: Event) {
    const target = <HTMLInputElement>object.currentTarget;
    const val = Boolean(target.valueAsNumber)
    this.ShowSweeper = val;
    setCookie('ShowSweeper', val.toString());
  }
  
  SetSampleType(object: Event) {
    const target = <HTMLInputElement>object.currentTarget;
    const val = SampleTypes[Math.round(target.valueAsNumber)]
    this.SampleType = val;
    setCookie('SampleType', val);
  }
  
  SetSoundType(object: Event) {
    const target = <HTMLInputElement>object.currentTarget;
    const index = Math.round(target.valueAsNumber);
    const val = SoundTypes[index];
    this.SoundType = val;
    setCookie('SoundType', val);
  }
  
  SetSoundVolume(object: Event) {
    const target = <HTMLInputElement>object.currentTarget;
    const val = Math.round(Math.pow(target.valueAsNumber, 2) * 100) / 100;
    this.SoundVolume = val;
    setCookie('SoundVolume', val.toString());
  }
  
  SetRadixSortBy(object: Event) {
    const target = <HTMLInputElement>object.currentTarget;
    const val = ['MSD', 'LSD'][target.valueAsNumber]
    this.RadixSortBy = val;
    setCookie('RadixSortBy', val);
  }
  SetRadixSortRadix(object: Event) {
    const target = <HTMLInputElement>object.currentTarget;
    const val = Math.round(target.valueAsNumber);
    this.RadixSortRadix = val;
    setCookie('RadixSortRadix', val.toString());
  }
  
  SetShellSortGap(object: Event) {
    const target = <HTMLInputElement>object.currentTarget;
    const val = ['Ciura', 'Shell', 'Hibbard', 'Tokuda'][target.valueAsNumber];
    this.ShellSortGap = val;
    setCookie('ShellSortGap', val);
  }
  
  SetBucketSortSize(object: Event) {
    const target = <HTMLInputElement>object.currentTarget;
    const val = Math.round(target.valueAsNumber);
    this.BucketSortSize = val;
    setCookie('BucketSortSize', val.toString());
  }
}

const isArraySorted = (array: IDataPoint[]): boolean => {
	const compare = (left: IDataPoint, right: IDataPoint) => left.data > right.data;

	for (const [index, element] of array.entries()) {
		if (array[index + 1] && compare(element, array[index + 1])) {
			return false;
		}
	}

	return true;
}
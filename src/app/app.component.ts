import { Component } from '@angular/core';
import { DataGenerator } from './shared/dataGenerator';
import { quickSort, mergeSort, insertionSort, radixSort, bogoSort } from './shared/algorithms';
import { IDataPoint } from './shared/dataGenerator';
import { barGraph, lineGraph, dotGraph } from './shared/dataGraph';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  SortingAlgorithm = 'Quick Sort';
  SortSpeed = 10;
  SampleSize = 256;
  GraphType = 'Bar Graph';
  SelectingAlgorithm = false;
  AlgorithmNames = ['Quick Sort', 'Merge Sort', 'Insertion Sort', 'Radix Sort', 'Bogo Sort'];
  AlgorithmFunctions: Array<(arr: IDataPoint[], data: any) => [Array<IDataPoint>, any] >= [quickSort, mergeSort, insertionSort, radixSort, bogoSort];
  GraphTypes = ['Bar Graph', 'Line Graph', 'Dot Graph'];
  GraphFunctions: Array<(arr: IDataPoint[], canvas: HTMLCanvasElement) => void> = [barGraph, lineGraph, dotGraph];
  SortingInterval: number | undefined;
  Data = DataGenerator(this.SampleSize);
  
  sortGraph = () => {
    let data: any = {};
    const canvas = <HTMLCanvasElement> document.getElementById('DataGraph');
    const graphType = this.GraphFunctions[this.GraphTypes.indexOf(this.GraphType)];
    const sortingAlgorithm = this.AlgorithmFunctions[this.AlgorithmNames.indexOf(this.SortingAlgorithm)];
    graphType(this.Data, canvas);
    this.SortingInterval = window.setInterval(() => {
      if (data.stop == true && this.SortingInterval !== undefined) {
        if (isArraySorted(this.Data) === false) console.log('The sorting algorithm failed, it did not sort correctly.')
        window.clearInterval(this.SortingInterval);
        return;
      }
      
      [this.Data, data] = sortingAlgorithm(this.Data, data);

      graphType(this.Data, canvas);
      
    }, this.SortSpeed);
  }

  ngOnInit() {
    setTimeout(() => this.sortGraph(), 100)
  }

  ResetGraph = () => {
    this.Data = DataGenerator(this.SampleSize);
    if (this.SortingInterval !== undefined) window.clearInterval(this.SortingInterval);
    this.sortGraph();
  }

  ShowAlgorithmList() {
    this.SelectingAlgorithm = !this.SelectingAlgorithm;
  }
  
  SetSort(val: string) {
    this.SortingAlgorithm = val;
    this.SelectingAlgorithm = false;
    this.Data = DataGenerator(this.SampleSize);
    if (this.SortingInterval !== undefined) window.clearInterval(this.SortingInterval)
    this.sortGraph()
  }
  
  SetSpeed(object: any) {
    this.SortSpeed = Math.round(Math.pow(parseFloat(object.currentTarget.valueAsNumber), 2));
  }

  SetSample(object: any) {
    this.SampleSize = Math.round(Math.pow(parseFloat(object.currentTarget.valueAsNumber), 2));
  }

  SetGraphType(object: any) {
    this.GraphType = this.GraphTypes[Math.round(object.currentTarget.valueAsNumber)]
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
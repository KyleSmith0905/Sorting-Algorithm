import { quickSort, mergeSort, insertionSort, radixSort, bogoSort, sleepSort, selectionSort, bitonicSort, stalinSort, bubbleSort, shellSort, heapSort, cocktailSort, gnomeSort, bucketSort, stoogeSort, oddEvenSort } from "./algorithms";
import { barGraph, lineGraph, dotGraph, colorCircle, historyGraph } from "./graphType";
import { rainbowColor, grayColor, monoColor, rainbowActive, grayActive, monoActive, reverseColor, reverseActive } from "./colorGenerator";
import { linearData, exponentialData, logarithmicData, constantData, reverseData, randomData } from "./sampleTypes";
import { soundDefault, soundNone } from "./soundPlayer";

export const AlgorithmNames = [
	'Quick Sort',
	'Merge Sort',
	'Insertion Sort',
	'Selection Sort',
	'Bitonic Sort',
	'Radix Sort',
	'Bogo Sort',
	'Sleep Sort',
	'Stalin Sort',
	'Bubble Sort',
	'Shell Sort',
	'Heap Sort',
	'Cocktail Sort',
	'Gnome Sort',
	'Bucket Sort',
	'Stooge Sort',
	'Odd-Even Sort',
];
export const AlgorithmFunctions: Array<(arr: IDataPoint[], data: any) => [Array<IDataPoint>, any] >= [
	quickSort,
	mergeSort,
	insertionSort,
	selectionSort,
	bitonicSort,
	radixSort,
	bogoSort,
	sleepSort,
	stalinSort,
	bubbleSort,
	shellSort,
	heapSort,
	cocktailSort,
	gnomeSort,
	bucketSort,
	stoogeSort,
	oddEvenSort,
];
export const AlgorithmDescriptions = [
	'Quick Sort compares all elements of a list to a pivot, larger values appear on one side, smaller values appear on the other side. Quick Sort continuously keeps selecting pivots until it could guarantee all points are sorted.',
	'Merge Sort starts by sorting every two elements. Then, the lists are sorted by comparing only the two smallest elements until all the elements are in ordered.',
	'Insertion Sort loops through an array. With each element, the sort looks for a place to insert it.',
	'Selection Sort find the lowest value of one array, and appends it to another array, until all elements went from the first array to the second.',
	'Bitonical Sort starts by grouping numbers in 2 groups, every group\'s top value is moved either to the top or bottom. Next, those groups are compared with a neighbor to sort groups of 4 by diving values by size recursively.',
	'Radix Sort starts by finding the number with the most digits. Next, the algorithm places elements into buckets based off of their first digit\'s value, now the numbers are sorted by a digit. The process is repeated with each digit.',
	'Bogo Sort randomizes the list of elements. Than it checks if the elements are sorted.',
	'Sleep Sort simultaneously waits the value of the element in milliseconds for each element. Due to inconsistencies with the function execution time or computer\'s internal time, it will repeat it but wait a longer amount of time.',
	'Stalin Sort loops through the array and removes any values not already sorted.',
	'Bubble Sort loops through the array to compare each number with the number before it, the bigger values moves to the right. So, small values are shifted left as large values are moved to the right.',
	'Shell Sort sorts every Nth values (where N is a gap selected from a gap sequence) by insertion. Shell Sort starts by sorting larger gaps and closing in until it reaches a gap size of 1.',
	'Heap Sort maintains a tree (or "heap") as an unsorted array and an additional sorted array. Every iteration the heap sort moves the tallest element into the sorted array, and then it maintains the heap.',
	'Cocktail Sort sweeps across an array picking up the tallest value and moving it to the right. Than the sort switches to picking up the shortest value and moving it to the left. This process repeats.',
	'Gnome Sort individually moves each element to the left until it is sorted with their neighbors.',
	'Bucket Sort places elements into buckets based on their data. The buckets are then individually sorted using another sorting algorithm.',
	'Stooge Sort replaces the first and last element of an array. Than the sort uses more Stooge Sorts to sort the following in order: first 2/3rds, the last 2/3rds, and the first 2/3rds.',
	'Odd-Even Sort compares every other numbered element in a list with the one to the right of it, such that no elements are compared twice. The algorithms repeats this process until the list is sorted.',
];
export const AlgorithmExamples = [
	'When moving into a new house, you place every kitchen item in the kitchen and everything else is placed in the living room. You then seperate all kitchen items into refrigerated items and normal items. You keep seperating items until everything has been individually placed correctly.',
	'You are organizing a messy library which only sorts books alphabetically. You organize each layer of each shelf individually, which helped you organize each book shelf. By dividing the library into smaller groups, every time you compare books you only had to compare two at a time.',
	'You are hanging up your recently washed shirts in your closet that is organized by color and type. You compare one washed shirt with each shirt in your closet from left to right until your washed shift is sorted. You then move on to another shirt and repeat the process.',
	'When working at a car dealership, you thought you should organize cars by size. You take the largest car and drive it to display, you keep driving cars onto the display until all the cars are on the display by size.',
	'You are running a 64-player single elimination tournament to find how good everyone is at a game. In the bracket, you start with 32 groups of 2. After a winner is decided, the winners fight another group. Enough games take place between the 2 groups to know the order of all 4 people. These battles happen with every group until a true winner is decided.',
	'You are organizing cards by numbers and suits. You seperate them into 4 piles: clubs, spaces, dimaonds, hearts. You than seperate them into face cards and number cards to make 8 total piles. Finally, you sort them by the value of the cards.',
	'Your child has a bag of 8 colored marbles that they are trying to organize. they keep rolling the marbles around randomly until it makes a rainbow. On average, after rolling 2,903,040 marbles your baby is likely to sort them.',
	'At a stud farm, you want to sort horses by speed so you could sell them for a good price. You decided you will race them in a local track. After racing them, you now have a sorted list of horse speed.',
	'You are trying to organize multi-colored candies. You throw all of the candies randomly across the table, then you look through the candy and eat any candy that is not organized.',
	'You are trying to pick up litter along a road. As you are running down the road you picked up a small piece of litter. You continue on the path until you found a larger piece of litter, you drop the small litter for the larger litter. After putting the large litter in the trash at the end of the road, you decide to run down the road again doing the same thing.',
	'After dropping a ton of important documents, you need to get them in order by noon. You laid down the papers where you can see the page numbers. You start with papers pages 1 and 302, you switch if out of order. Next you compare the next pages, 2 and 303. After ordering all the pages once, you decrease the space between numbers, you are comparing, so pages 1 and 133 next.',
	'You are managing a recruitment team for a big company. Each bottom-level employees receives a batch of applications that will be organized by skill. Middle-level receives a few applications from bottom-level, they organize them by skill. The top-level selects from applications the middle-level gave them.',
	'During an earthquake, everything from a store\'s spice aisle were knocked down. The store had sorted the spices by bitterness. You start at one side of the aisle and collect the most bitter spice and place it on the shelf, than you walk to the other side of the aisle and collect the least bitter spice and place it on the shelf. As the spices reach the center, you should have it organized.',
	'At a vitamin store, you organized protein shakes by nutrition information so customers can make easier purchasing decisions. A new flavor of protein shakes were released. You move down the aisle comparing the nutrition label of each shake one by one, for each comparison, you place the new shake nearby to compare labels.',
	'At a central warehouse for a large company, your role is to ship to other warehouses. You put boxes into "buckets" determined by the warehouses they are going to. After shipping, the other warehouses are responsible for sorting their boxes for shipping.',
	'At a accounting company with 3 employees, you decided to organize a filling cabinent that nobody ever tried to even come close to organizing. You decide to split up the labor between the other 2 employees, everyone sorts 2/3rds of it. To split the work throughout the day, you sort 2/3rds 3 times.',
	'',
];

export const GraphTypes = ['Bar Graph', 'Line Graph', 'Dot Graph', 'Color Circle', 'History Graph'];
export const GraphTypeFunctions: Array<(arr: IDataPoint[], canvas: HTMLCanvasElement, activeColor: () => string, data: any) => void> = [barGraph, lineGraph, dotGraph, colorCircle, historyGraph];

export const GraphColors = ['Rainbow', 'Gray', 'Single Color', 'Reverse'];
export const GraphColorFunctions: Array<(index: number, totalArray: number, position: number) => string> = [rainbowColor, grayColor, monoColor, reverseColor];
export const GraphColorActiveFunctions: Array<() => string> = [rainbowActive, grayActive, monoActive, reverseActive];

export const SampleTypes = ['Linear', 'Exponential', 'Logarithmic', 'Random', 'Constant', 'Reverse'];
export const SampleTypeFunctions: Array<(numbers: number[], index: number, totalLength: number) => [number, number]> = [linearData, exponentialData, logarithmicData, randomData, constantData, reverseData];

export const SoundTypes = ['None', 'Default'];
export const SoundTypeFunctions: Array<(dataPoint: number, oscillator: OscillatorNode) => void> = [soundNone, soundDefault];

export interface IDataPoint {
	color: string;
	height: number;
	data: number;
	id: number;
	highlight?: boolean;
}
# Sorting Algorithm Visualizer

View sorting algorithms [here](https://sorting-algorithm-jet.vercel.app/).

## How to View
Simply prepare your favorite modern browser.

1. Navigate to https://sorting-algorithm-jet.vercel.app/.

2. To select a specific sorting algorithm:

	a. Press the button on the top of the page after the "Sorting with" text.

	b. Press on any of the buttons displayed.

3. To customize graph, sound, samples, or sorting:

	a. Look either below the graph or to the right. Click on the menu, for example: *Sound Settings*.

	b. Look over the slider menu that appeared below the menu containing button you clicked.

	c. To change an option, slide the square along the slider.

## Contributing
If you wanted to add additional algorithms, such as sorting algorithms. Navigate to `src/settings/{Setting Name}` and create a `.ts` file. To help with when creating algorithms, please take these advice.

| Settings Name | Advice |
|:-:|:-|
| Sorting Algorithm | <li>Variables that persist after every iteration is stored in the `data` parameter as `any`.</li><li>Sorting algorithms are supposed to only perform a few actions to the array everytime it's called.</li><li>With recusive algorithms (like *Stooge Sort*) you could unravel algorithms into a "nests" array. Replace each recursive call by pushing to the "nests" array instead. Refer to `StoogeSort.ts` for better understanding.</li><li>With Iterative algorithms (like *Gnome Sort*) replace all `for(a; b; c) {d}` with: `a; if (b) { d }; c`. Refer to `GnomeSort.ts` for better understanding.</li><li>Push indexes of coordinates changing or comparing to `data.highlight`. Define the most important coordinate to `data.actionPoint` </li> |
| Graph Color | <li>Highlight color is the color of the "sweeper".</li>|
| Graph Type | <li>Variables that persist after every iteration is stored in the `graphData` parameter as `any`.</li><li>This is the slowest operation due to canvas. Minimize the number of times stroke or filled.</li> |
| Sample Type | <li>The order of the output does not matter.</li>. |
| Sample Order | <li>The coordinates will be sorted when received.</li>. |
| Sound Type | <li>Stopping the oscillator results in a *clicking* sounds that does not sound good every 4 millisecond. Instead, modify the oscillator in the parameter. |

It's better to contribute something small/broken than to contribute nothing.
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { sortingAlgorithms } from 'src/settings';
import { SetCookie } from 'src/shared/cookies';
import { ISortingAlgorithm } from 'src/shared/interfaces';

@Component({
	selector: 'selectAlgorithm-page',
	templateUrl: './select-algorithm.component.html',
})
export class SelectAlgorithmComponent {
	SortingAlgorithms: ISortingAlgorithm[] = sortingAlgorithms;

	router: Router;
	constructor(router: Router) {
		this.router = router;
	}

	SetSort(val: MouseEvent) {
		const target = <HTMLParagraphElement>val.target;
		SetCookie('SortingAlgorithm', target.innerText);
		this.router.navigate(['']);
	}
}
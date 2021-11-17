import { Component, Input } from '@angular/core';
import { settings } from 'src/settings';

@Component({
	selector: 'component-menu',
	templateUrl: './menu.component.html',
})
export class menuComponent {
	@Input() SortingAlgorithm = settings.SortingAlgorithm;

	ShowMenu(object: MouseEvent) {
		const topTarget = <HTMLElement>object.currentTarget;
		const pathTarget = <SVGPathElement>topTarget.childNodes[0].childNodes[0];
    
		const isCollapsed = topTarget.getAttribute('collapsed') === 'true';
    
		const childs = topTarget.parentElement?.children;
		if (childs) {
			for (let i = 0; i < childs.length; i++) {
				const child = childs[i];
				if (child.isSameNode(topTarget)) continue;
				child.setAttribute('collapsed', 'true');
				const pathTarget = <SVGPathElement>child?.childNodes[0].childNodes[0];
				if (pathTarget) pathTarget.setAttribute('d', 'M 5,25 L 5,5 L 45,5 L 45,25');
			}
		}

		pathTarget.setAttribute('d', isCollapsed === false ? 'M 5,25 L 5,5 L 45,5 L 45,25' : 'M 5,5 L 25,20 L 25,20 L 45,5');
		topTarget.setAttribute('collapsed', (!isCollapsed).toString());

		const submenu = document.getElementById('SelectedSettings');
		const submenuChildren = submenu?.children;
		if (submenuChildren === undefined) return;
		let menuIndex = -1;
		if (topTarget.parentNode) menuIndex = Array.from(topTarget?.parentNode?.children).indexOf(topTarget);

		for (let i = 0; i < submenuChildren?.length; i++) {
			const child = submenuChildren[i];
			if (isCollapsed === true && i === menuIndex) child.removeAttribute('hidden');
			else child.setAttribute('hidden', '');
		}

		if (isCollapsed === true) submenu?.removeAttribute('hidden');
		else submenu?.setAttribute('hidden', '');
	}}
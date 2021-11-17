import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SelectAlgorithmComponent } from './select-algorithm/select-algorithm.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'select algorithm', component: SelectAlgorithmComponent },
];

@NgModule({
	declarations: [],
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

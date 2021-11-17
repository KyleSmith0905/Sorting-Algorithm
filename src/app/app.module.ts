import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { menuComponent } from './_components/menu.component';
import { submenuComponent } from './_components/submenu.component';
import { AppRoutingModule } from './app-routing.module';
import { SelectAlgorithmComponent } from './select-algorithm/select-algorithm.component';
import { HomeComponent } from './home/home.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		SelectAlgorithmComponent,
		menuComponent,
		submenuComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }

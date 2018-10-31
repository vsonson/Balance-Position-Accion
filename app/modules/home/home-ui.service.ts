import { Injectable } from '@angular/core';


export class HomeUIScope {
	appBarTitle: string = "";
}  


@Injectable()
export class HomeUI {

	constructor(private homeUiScope: HomeUIScope){}

	setAppBarTitle(title: string) {
		this.homeUiScope.appBarTitle = title;
	}

}




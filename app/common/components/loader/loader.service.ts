import { Injectable } from '@angular/core';


export class LoaderScope  {
	open: boolean = false;
	title: string = 'Loading';
}



@Injectable()
export class Loader {

	constructor(
		public loaderScope: LoaderScope
		) {}

	show(title) {
    	this.loaderScope.open = true;
    	this.loaderScope.title = title || 'Loading'
    }

    hide() {
          this.loaderScope.open = false;
          this.loaderScope.title = "";
    	}
}
import { Component, OnInit, OnDestroy } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { LoaderScope } from './../../common/components/loader/loader.service'
import { GC } from "utils/utils";

@Component({
	selector: "ns-app-auth",
	template: "<router-outlet></router-outlet>"
})

export class AuthComponent implements OnInit, OnDestroy {

	constructor(
		private routerExtensions: RouterExtensions,
		public loaderScope: LoaderScope
	) {

	}

	ngOnInit() {
	
	}

	ngOnDestroy() {
		GC();
	}

}

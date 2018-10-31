// >> sidedrawer-getting-started-angular
import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Page } from "ui/page";

import { LoaderScope } from './loader.service';


@Component({
    moduleId: module.id,
    selector: "app-loader",
    templateUrl: 'loader.component.html',
    styleUrls: ['loader.component.css']
})
export class LoaderComponent  {

    constructor(public loaderScope: LoaderScope) {

    }
   
}

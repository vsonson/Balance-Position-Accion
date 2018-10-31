import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef, ViewEncapsulation, OnDestroy } from "@angular/core";
import { Page } from "ui/page";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { GC } from "utils/utils";

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.None,
    selector: "app-drawer-items",
    template: '<router-outlet></router-outlet>'
})
export class DrawerItemComponent implements OnInit, OnDestroy {

    constructor(
        page: Page
    ) {
        page.actionBarHidden = true;
    }

    ngOnInit() {
    
    }

    ngOnDestroy() {
        GC();
    }
}
// << sidedrawer-getting-started-angular

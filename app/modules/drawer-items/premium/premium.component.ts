import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef, ViewEncapsulation } from "@angular/core";
import { Page } from "ui/page";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer, SideDrawerLocation } from 'nativescript-ui-sidedrawer';
import { GC } from "utils/utils";
import { Navigation } from './../../../common/services/common.service';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.None,
    selector: "app-dashboard",
    templateUrl: './premium.component.html'
})
export class PremiumComponent implements OnInit {

    constructor(
            page: Page, private router: RouterExtensions, private navigation: Navigation
        ) {
        page.actionBarHidden = true;
    }

    ngOnInit()
    {

    }
    ngOnDestroy() {
        GC();
      }

      goBack() {
        this.router.navigate(['/home/dashboard']);
      }

 
}
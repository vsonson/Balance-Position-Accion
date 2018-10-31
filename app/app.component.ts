import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef, ViewEncapsulation, OnDestroy } from "@angular/core";
import { Page } from "ui/page";
import { Observable } from 'rxjs/Rx'
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer, SideDrawerLocation } from 'nativescript-ui-sidedrawer';
import { LoaderScope } from './common/components/loader/loader.service';
import { GC } from "utils/utils";



@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.None,
    selector: "my-app",
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

    private _mainContentText: string;
    currentLocation = SideDrawerLocation.Right;
    settings: any;

    constructor(
        private _changeDetectionRef: ChangeDetectorRef,
        public loaderScope: LoaderScope,
        page: Page
    ) {
        page.actionBarHidden = true;
    }

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    ngOnInit() {
        
    }

    ngOnDestroy() {
        GC();
    }

    get mainContentText() {
        return this._mainContentText;
    }

    set mainContentText(value: string) {
        this._mainContentText = value;
    }

    public openDrawer() {
        this.drawer.showDrawer();
    }

    public onCloseDrawerTap() {
        this.drawer.closeDrawer();
    }

    doGC(): void {
        GC();
    }

}

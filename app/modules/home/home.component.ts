import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef, ViewEncapsulation, OnDestroy } from "@angular/core";
import { Page } from "ui/page";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer, SideDrawerLocation } from 'nativescript-ui-sidedrawer';
import { RouterExtensions } from "nativescript-angular/router";
import { Observable } from 'rxjs/Rx'
import { Navigation } from './../../common/services/common.service'
import { HomeUIScope } from './home-ui.service';
import { GC } from "utils/utils";
class HomeNavItem {
    constructor(public id: number, public name: string, public color: string, public icon: string) {
        console.log(icon)
    }
}


@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.None,
    selector: "app-dashboard",
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
    private _mainContentText: string;
    currentLocation = SideDrawerLocation.Right;
    public homeNavItems: Array<HomeNavItem> = [];
    private counter: number;
    isDrawerOpen;

    constructor(
        private _changeDetectionRef: ChangeDetectorRef,
        page: Page,
        private routerExtensions: RouterExtensions,
        private navigation: Navigation,
        public homeUiScope: HomeUIScope
    ) {
        page.actionBarHidden = true;
        // this.initHomeNavItems();
    }

    initHomeNavItems() {
        this.homeNavItems.push(new HomeNavItem(0, 'usr-info', '', ''));
        this.homeNavItems.push(new HomeNavItem(1, 'Mood', '#ffea5d', String.fromCharCode(0xf007)));
        this.homeNavItems.push(new HomeNavItem(1, 'Sleep', '#d4e959', 'cloud'));
        this.homeNavItems.push(new HomeNavItem(1, 'Stress', '#7ee64f', 'cloud'));
        this.homeNavItems.push(new HomeNavItem(1, 'Performance', '#7ee64f', 'cloud'));
    }

    @ViewChild(RadSideDrawerComponent) protected drawerComponent: RadSideDrawerComponent;
    protected drawer: RadSideDrawer;

    ngAfterViewInit() {
        if (this.drawerComponent) {
            this.drawer = this.drawerComponent.sideDrawer;
            this._changeDetectionRef.detectChanges();
        }

    }

    ngOnInit() {
        GC();
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
        this.isDrawerOpen = true;
    }

    public onCloseDrawerTap() {
        this.drawer.closeDrawer();
        this.isDrawerOpen = false;
    }

    onDrawerClosed(e) {
        console.log('closeed draweer')
        this.isDrawerOpen = false;
    }

    public navigate(link: string) {
        if (link == '/auth/signin') {
            localStorage.removeItem('currentUser');
        }
        this.navigation.navigate([link]);
    }
    doGC(): void {
        GC();
    }

}
// << sidedrawer-getting-started-angular

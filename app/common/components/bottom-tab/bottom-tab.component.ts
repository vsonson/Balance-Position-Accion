// >> sidedrawer-getting-started-angular
import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Page } from "ui/page";
import { RouterExtensions } from 'nativescript-angular/router'
import { Router, NavigationEnd } from '@angular/router';

class BottomBarItems {
    name: string;
    link: string;
    icon: string;
    constructor(name, link, icon) {
        this.name = name;
        this.link = link;
        this.icon = icon;
    }
}


@Component({
    moduleId: module.id,
    selector: "bottom-tab",
    templateUrl: 'bottom-tab.component.html'
})
export class BottomTabComponent implements OnInit {

    items: Array<BottomBarItems> = [];
    activeIndex: number;

    constructor(private router: RouterExtensions, private ngRouter: Router) {
        this.items.push(new BottomBarItems("Dashboard", "/home/dashboard", 'res://dash_'));
        this.items.push(new BottomBarItems("Practice", "/home/practice", 'res://mindfullness_'));
        this.items.push(new BottomBarItems("Notebook", "/home/notebook", 'res://notebook_'));
        this.items.push(new BottomBarItems("myNetwork", "/home/network", 'res://mynet_'));
    }

    ngOnInit() {
        this.updateCurrentRouter();
        this.router.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.updateCurrentRouter();
                console.log('navi end: ', this.router.router.url);
            }
        })
    }

    updateCurrentRouter() {
        let cur = this.router.router.url;
        console.log("Current Router", cur);
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].link == cur) {
                this.activeIndex = i;
                break;
            }
        }
    }

    navigate(url, index) {
        // this.activeIndex = index;
        this.router.navigate([url]);
    }
}
// << sidedrawer-getting-started-angular

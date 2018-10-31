import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { SwipeGestureEventData } from "ui/gestures";
import { Page } from "ui/page";
import { RouterExtensions } from "nativescript-angular/router";
import { GC } from 'utils/utils';

@Component({
  moduleId: module.id,
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})

export class TrackComponent implements OnInit, OnDestroy {

  trackRoutingList: ITrackRoutingList[];
  activeRouterIndex: number = 0;
  swipeLayoutDirection: number = -1;

  constructor(
    page: Page,
    private routerExtensions: RouterExtensions,
    private zone: NgZone
  ) {
    page.actionBarHidden = true;
  }

  ngOnInit() {
    
    this.initList();
  }

  ngOnDestroy() {
    GC();
  }

  initList() {
    this.trackRoutingList = [];
    this.trackRoutingList.push({ name: "My Mood", link: "/track/mood" });
    this.trackRoutingList.push({ "name": "My Sleep", link: "/track/sleep" });
    this.trackRoutingList.push({ "name": "My Stress", link: '/track/stress' });
    this.trackRoutingList.push({ "name": "My Energy", link: '/track/energy' });
    this.trackRoutingList.push({ "name": "My Performance", link: '/track/performance' });
    this.trackRoutingList.push({ "name": "My Focus", link: '/track/focus' });
    this.trackRoutingList.push({ "name": "My Appetite", link: '/track/appetite' });
    this.trackRoutingList.push({ "name": "My Body", link: '/track/body' });
    this.trackRoutingList.push({ "name": "My Interest", link: '/track/interest' });
    this.trackRoutingList.push({ "name": "My Injury", link: '/track/injury' });
  }

  onSwipe(args: SwipeGestureEventData) {
    if (args.direction == 2 || args.direction == 1) {
      this.swipeLayoutDirection = args.direction;
      if (args.direction == 2) { //right
        if (this.activeRouterIndex == this.trackRoutingList.length - 1) {
          this.activeRouterIndex = 0;
        }
        else {
          this.activeRouterIndex += 1;
        }

      }
      if (args.direction == 1) { //left
        if (this.activeRouterIndex == 0) {
          this.activeRouterIndex = this.trackRoutingList.length - 1;
        }
        else {
          this.activeRouterIndex -= 1;
        }
      }
      console.log(this.trackRoutingList[this.activeRouterIndex].link, '<--navigateing')
      this.zone.run(() => {
        this.routerExtensions.navigate([this.trackRoutingList[this.activeRouterIndex].link]);
      })

    }
  }


}

interface ITrackRoutingList {
  name: string;
  link: string;
}

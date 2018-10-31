import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { Page } from "ui/page";
import { Location } from '@angular/common';
import { RouterExtensions } from "nativescript-angular/router";
import { NotedialogboxComponent } from '../../../common/components/notedialogbox/notedialogbox.component';
import { ModalDialogOptions } from 'nativescript-angular';
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { InfoComponent } from '../info/info.component';
import { DataPointsHttpService } from './../datapoints-http.service';
import { Loader } from './../../../common/components/loader/loader.service';
import { Utility } from './../../../common/services/common.service';
import { GC } from "utils/utils";

class Performance {
  constructor(public Day?: string, public PerformanceLevel?: number) {
  }
}

@Component({
  moduleId: module.id,
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit, OnDestroy {
  myStr: any;
  dataPointName: string = 'Performance';
  isMakeNote: boolean;
  graphData: Performance[];
  private _categoricalSource: ObservableArray<Performance>;
  constructor(page: Page, private _location: Location, private routerExtensions: RouterExtensions, private loader: Loader, private utility: Utility,
    private viewContainerRef: ViewContainerRef, private httpService: DataPointsHttpService, private modalDialogService: ModalDialogService) {
    page.actionBarHidden = true;
  }
  get categoricalSource(): ObservableArray<Performance> {
    return this._categoricalSource;
  }

  ngOnInit() {
  
    this.getData();
  }

  ngOnDestroy() {
    GC();
  }

  getData() {
    this.loader.show('loading..');
    this.httpService.getAllMetricData('Performance').subscribe((res) => {
      let tempData: Performance[] = [];
      let response: any[] = JSON.parse(JSON.stringify(res));
      for (let i = 0; i < response.length; i++) {
        tempData.push({ 'Day': this.utility.getDayNameInWeek(response[i].timestamp, true), 'PerformanceLevel': parseInt(response[i].datumValue) });
      }
      tempData = this.utility.formatGraphArray(tempData, "PerformanceLevel", true)
      this.graphData = tempData;
      this.loader.hide();
    }, (err) => {
      console.log("err", err)
      this.loader.hide();
    })
  }

  getCategoricalSource(): Performance[] {
    return [
      { Day: "Mon", PerformanceLevel: 0 },
      { Day: "Tue", PerformanceLevel: 3 },
      { Day: "Wed", PerformanceLevel: 5 },
      { Day: "Thu", PerformanceLevel: 3 },
      { Day: "Fri", PerformanceLevel: 2 },
      { Day: "Sat", PerformanceLevel: 5 },
      { Day: "Sun", PerformanceLevel: 2 }
    ];
  }

  public goBack() {
    this._location.back();
  }

  public openNote() {
    this.isMakeNote = true;
    this.myStr = { "title": "Performance", "imgURL": "res://performance_grey", "isDialogVisible": this.isMakeNote };
    let options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      context: { data: this.myStr }
    };

    this.modalDialogService.showModal(NotedialogboxComponent, options).then(() => {

    });
  }

  public trackPerformance() {
    this.routerExtensions.navigate(["/track/performance"]);
  }
  public performancePlaybook() {
    this.routerExtensions.navigate(["/myplaybook/performance"]);
  }
  public openInfo() {
    let options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      context: { screen: 'performance' }
    };

    this.modalDialogService.showModal(InfoComponent, options).then(() => {

    });
  }
 
}
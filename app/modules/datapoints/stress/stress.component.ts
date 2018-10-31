import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { Page } from "ui/page";
import { Location } from '@angular/common';
import { NotedialogboxComponent } from '../../../common/components/notedialogbox/notedialogbox.component';
import { ModalDialogOptions, ModalDialogService, RouterExtensions } from 'nativescript-angular';
import { InfoComponent } from '../info/info.component';
import { DataPointsHttpService } from './../datapoints-http.service';
import { Loader } from './../../../common/components/loader/loader.service';
import { Utility } from './../../../common/services/common.service';
import { GC } from "utils/utils";


class Stress {
  constructor(public Day?: string, public StressLevel?: number) {
  }
}

@Component({
  moduleId: module.id,
  selector: 'app-stress',
  templateUrl: './stress.component.html',
  styleUrls: ['./stress.component.css']
})
export class StressComponent implements OnInit, OnDestroy {
  myStr: any;
  dataPointName: string = 'Stress';
  isMakeNote: boolean;
  graphData: Stress[];
  private _categoricalSource: ObservableArray<Stress>;
  constructor(page: Page, private _location: Location, private modalDialogService: ModalDialogService, private loader: Loader, private utility: Utility,
    private viewContainerRef: ViewContainerRef, private httpService: DataPointsHttpService, private routerExtensions: RouterExtensions) {
    page.actionBarHidden = true;
  }
  get categoricalSource(): ObservableArray<Stress> {
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
    this.httpService.getAllMetricData('Stress').subscribe((res) => {
      let tempData: Stress[] = [];
      let response: any[] = JSON.parse(JSON.stringify(res));
      for (let i = 0; i < response.length; i++) {
        tempData.push({ 'Day': this.utility.getDayNameInWeek(response[i].timestamp, true), 'StressLevel': parseInt(response[i].datumValue) });
      }
      
      tempData = this.utility.formatGraphArray(tempData, "StressLevel", true);
      this.graphData = tempData;
      this.loader.hide();
    }, (err) => {
      console.log("err", err)
      this.loader.hide();
    })
  }
  public goBack() {
    this._location.back();
  }

  public openNote() {
    this.isMakeNote = true;
    this.myStr = { "title": "Stress", "imgURL": "res://stress_grey", "isDialogVisible": this.isMakeNote };
    let options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      context: { data: this.myStr }
    };

    this.modalDialogService.showModal(NotedialogboxComponent, options).then(() => {

    });
  }

  public openInfo() {
    let options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      context: { screen: 'stress' }
    };

    this.modalDialogService.showModal(InfoComponent, options).then(() => {

    });
  }

  public trackStress() {
    this.routerExtensions.navigate(["/track/stress"]);
  }
  public stressPlaybook() {
    this.routerExtensions.navigate(["/myplaybook/stress"]);
  }

 
}
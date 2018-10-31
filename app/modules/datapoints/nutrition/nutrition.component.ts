import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { Page } from "ui/page";
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { Location } from '@angular/common';
import { NotedialogboxComponent } from '../../../common/components/notedialogbox/notedialogbox.component';
import { ModalDialogOptions, ModalDialogService, RouterExtensions } from 'nativescript-angular';
import { InfoComponent } from '../info/info.component';
import { Loader } from './../../../common/components/loader/loader.service';
import { Utility } from './../../../common/services/common.service';
import { DataPointsHttpService } from './../datapoints-http.service';
import { GC } from "utils/utils";

class Appetite {
  constructor(public Day?: string, public AppetiteLevel?: number) {
  }
}

@Component({
  moduleId: module.id,
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.css']
})
export class NutritionComponent implements OnInit, OnDestroy {
  myStr: any;
  isMakeNote: boolean;
  graphData: Appetite[];
  private _categoricalSource: ObservableArray<Appetite>;
  constructor(page: Page, private _location: Location, private modalDialogService: ModalDialogService,
    private viewContainerRef: ViewContainerRef, private routerExtensions: RouterExtensions, private loader: Loader, private utility: Utility, private httpService: DataPointsHttpService) {
    page.actionBarHidden = true;
  }

  get categoricalSource(): ObservableArray<Appetite> {
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
    this.httpService.getAllMetricData('Appetite').subscribe((res) => {
      let tempData: Appetite[] = [];
      let response: any[] = JSON.parse(JSON.stringify(res));
      console.log("Response for appetite",JSON.stringify(response));
      for (let i = 0; i < response.length; i++) {
        tempData.push({ 'Day': this.utility.getDayNameInWeek(response[i].timestamp, true), 'AppetiteLevel': parseInt(response[i].datumValue) });
      }
      tempData = this.utility.formatGraphArray(tempData, "AppetiteLevel", true)
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
    this.myStr = { "title": "Appetite", "imgURL": "res://appetite_grey", "isDialogVisible": this.isMakeNote };
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
      context: { screen: 'appetite' }
    };

    this.modalDialogService.showModal(InfoComponent, options).then(() => {

    });
  }

  public trackAppetite() {
    this.routerExtensions.navigate(["/track/appetite"]);
  }
  public appetitePlaybook() {
    this.routerExtensions.navigate(["/myplaybook/appetite"]);
  }
 
}

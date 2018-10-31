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

class Interest {
  constructor(public Day?: string, public InterestLevel?: number) {
  }
}


@Component({
  moduleId: module.id,
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.css']
})
export class InterestComponent implements OnInit, OnDestroy {
  myStr: any;
  dataPointName: string = 'Interest';
  isMakeNote: boolean;
  graphData: Interest[];
  private _categoricalSource: ObservableArray<Interest>;
  constructor(page: Page, private _location: Location, private modalDialogService: ModalDialogService, private loader: Loader, private utility: Utility,
    private viewContainerRef: ViewContainerRef, private httpService: DataPointsHttpService, private routerExtensions: RouterExtensions) {
    page.actionBarHidden = true;
  }

  get categoricalSource(): ObservableArray<Interest> {
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
    this.httpService.getAllMetricData('Interest').subscribe((res) => {
      let tempData: Interest[] = [];
      let response: any[] = JSON.parse(JSON.stringify(res));
      for (let i = 0; i < response.length; i++) {
        tempData.push({ 'Day': this.utility.getDayNameInWeek(response[i].timestamp, true), 'InterestLevel': parseInt(response[i].datumValue) });
      }
      tempData = this.utility.formatGraphArray(tempData, 'InterestLevel', true);
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
    this.myStr = { "title": "Interest", "imgURL": "res://interest_grey", "isDialogVisible": this.isMakeNote };
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
      context: { screen: 'interest' }
    };

    this.modalDialogService.showModal(InfoComponent, options).then(() => {

    });
  }

  public trackInterest() {
    this.routerExtensions.navigate(["/track/interest"]);
  }
  public interestPlaybook() {
    this.routerExtensions.navigate(["/myplaybook/interest"]);
  }

 
}

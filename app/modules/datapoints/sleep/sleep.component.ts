import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { Page } from "ui/page";
import { Location } from '@angular/common';
import { NotedialogboxComponent } from '../../../common/components/notedialogbox/notedialogbox.component';
import { ModalDialogOptions, ModalDialogService, RouterExtensions } from 'nativescript-angular';
import { InfoComponent } from '../info/info.component';
import { DataPointsHttpService } from './../datapoints-http.service';
import { Loader } from './../../../common/components/loader/loader.service';
import { Utility } from './../../../common/services/common.service';
import { GC } from "utils/utils";

class Sleep1 {
  constructor(public Day?: string, public Amount?: number) {
  }
}
class Sleep2 {
  constructor(public Day?: string, public restValue?: number) {
  }
}

@Component({
  moduleId: module.id,
  selector: 'app-sleep',
  templateUrl: './sleep.component.html',
  styleUrls: ['./sleep.component.css']
})
export class SleepComponent implements OnInit, OnDestroy {
  myStr: any;
  dataPointName: string = 'Sleep';
  isMakeNote: boolean;
  graphData1: Sleep1[];
  graphData2: Sleep2[];

  items: Array<any> = [
    { Country: "mon", Amount: 6, restValue: 2, Year: 0 },
    { Country: "tues", Amount: 8, restValue: 8, Year: 0 },
    { Country: "wed", Amount: 4, restValue: 4, Year: 0 },
    { Country: "thurs", Amount: 8, restValue: 2, Year: 0 },
    { Country: "fri", Amount: 2.5, restValue: 6, Year: 0 },
    { Country: "sat", Amount: 12, restValue: 6, Year: 0 },
    { Country: "sun", Amount: 6.3, restValue: 8, Year: 0 }
  ];

  constructor(page: Page, private _location: Location, private modalDialogService: ModalDialogService,
    private viewContainerRef: ViewContainerRef, private httpService: DataPointsHttpService, private loader: Loader, private utility: Utility, private routerExtensions: RouterExtensions) {
    page.actionBarHidden = true;
  }

  ngOnInit() {
  
    this.getData();

  }

  ngOnDestroy() {
    GC();
  }

  getData() {
    this.loader.show('loading..');
    this.httpService.getAllMetricData('Sleep').subscribe((res) => {
      let tempData1: Sleep1[] = [];
      let tempData2: Sleep2[] = [];
      let response: any[] = JSON.parse(JSON.stringify(res));
      for (let i = 0; i < response.length; i++) {
        tempData1.push({ 'Day': this.utility.getDayNameInWeek(response[i].timestamp ,true), 'Amount': parseInt(response[i].durationHours) });
        tempData2.push({ 'Day': this.utility.getDayNameInWeek(response[i].timestamp, true), 'restValue': parseInt(response[i].datumValue) });
      }
      tempData1 = this.utility.formatGraphArray(tempData1, 'Amount', true);
      tempData2 = this.utility.formatGraphArray(tempData2, 'restValue', true);
      this.graphData1 = tempData1;
      this.graphData2 = tempData2;
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
    this.myStr = { "title": "Sleep", "imgURL": "res://sleep_grey", "isDialogVisible": this.isMakeNote };
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
      context: { screen: 'sleep' }
    };

    this.modalDialogService.showModal(InfoComponent, options).then(() => {

    });
  }

  public trackSleep() {
    this.routerExtensions.navigate(["/track/sleep"]);
  }
  public sleepPlaybook() {
    this.routerExtensions.navigate(["/myplaybook/sleep"]);
  }

 
}

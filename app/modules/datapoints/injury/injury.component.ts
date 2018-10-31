import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { Loader } from './../../../common/components/loader/loader.service';
import { InfoComponent } from '../info/info.component';
import { RouterExtensions, ModalDialogOptions, ModalDialogService } from 'nativescript-angular';
import { DataPointsHttpService } from './../datapoints-http.service';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { Page } from "ui/page";
import { Location } from '@angular/common';
import { NotedialogboxComponent } from '../../../common/components/notedialogbox/notedialogbox.component';
import { Utility } from './../../../common/services/common.service';
import { GC } from "utils/utils";

class Body1 {
  constructor(public Day?: string, public Headache?: number) {
  }
}
class Body2 {
  constructor(public Day?: string, public Digestive?: number) {
  }
}


@Component({
  moduleId: module.id,
  selector: 'app-injury',
  templateUrl: './injury.component.html',
  styleUrls: ['./injury.component.css']
})
export class InjuryComponent implements OnInit, OnDestroy {
  myStr: any;
  dataPointName: string = 'Stress';
  isMakeNote: boolean;
  graphData1: Body1[];
  graphData2: any[];
  graphData3: any[];

  constructor(page: Page, private _location: Location, private modalDialogService: ModalDialogService, private loader: Loader, private utility: Utility,
    private viewContainerRef: ViewContainerRef, private httpService: DataPointsHttpService, private routerExtensions: RouterExtensions) {
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
      this.httpService.getAllMetricData('Body', ['Body', 'Injury']).subscribe((res) => {
      let tempData1: Body1[] = [];
      let tempData3: any[] = [];
      let tempData2: any[] = [];
      console.log(JSON.stringify(res))
      let response: any[] = JSON.parse(JSON.stringify(res));
      let seperatedData = this.utility.seperateDataPoints('Body', 'Injury', response);
      for (let i = 0; i < seperatedData['Body'].length; i++) {
        tempData1.push({ 'Day': this.utility.getDayNameInWeek(seperatedData['Body'][i].timestamp, true), 'Headache': parseInt(seperatedData['Body'][i].headache) });
      }
      for (let i = 0; i < seperatedData['Body'].length; i++) {
        tempData3.push({ 'Day': this.utility.getDayNameInWeek(seperatedData['Body'][i].timestamp, true), 'datumValue': parseInt(seperatedData['Body'][i].datumValue) });
      }
      for (let i = 0; i < seperatedData['Injury'].length; i++) {
        tempData2.push({ 'Day': this.utility.getDayNameInWeek(seperatedData['Injury'][i].timestamp, true), 'datumValue': parseInt(seperatedData['Injury'][i].datumValue) });
      }
      console.log("temp graph array body:", JSON.stringify(tempData1));
      console.log("temp graph array injury:", JSON.stringify(tempData2));


      this.graphData1 = this.utility.formatGraphArray(tempData1, "Headache", true);
      this.graphData3 = this.utility.formatGraphArray(tempData3, "datumValue", true);
      this.graphData2 = this.utility.formatGraphArray(tempData2, "datumValue", true);

      console.log("final graph array body:", JSON.stringify(this.graphData1));
      console.log("final graph array injury:", JSON.stringify(this.graphData2));
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
    this.myStr = { "title": "Injury", "imgURL": "res://injury_grey", "isDialogVisible": this.isMakeNote };
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
      context: { screen: 'injury' }
    };

    this.modalDialogService.showModal(InfoComponent, options).then(() => {

    });
  }

  public trackStress() {
    this.routerExtensions.navigate(["/track/injury"]);
  }
  public stressPlaybook() {
    this.routerExtensions.navigate(["/myplaybook/injury"]);
  }


 
}

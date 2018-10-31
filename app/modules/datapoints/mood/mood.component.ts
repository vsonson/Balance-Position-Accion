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

let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
class Mood {
  constructor(public Day?: string, public MoodLevel?: number) {
  }
}

@Component({
  moduleId: module.id,
  selector: 'app-mood',
  templateUrl: './mood.component.html',
  styleUrls: ['./mood.component.css']
})

export class MoodComponent implements OnInit, OnDestroy {
  myStr: any;

  graphArr: any = [];
  data: ArrayBuffer;
  isMakeNote: boolean;
  dataPointName: string = 'Mood';
  graphData: Mood[];
  constructor(page: Page, private _location: Location, private loader: Loader, private utility: Utility, private modalDialogService: ModalDialogService,
    private viewContainerRef: ViewContainerRef, private routerExtensions: RouterExtensions, private httpService: DataPointsHttpService) {
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
    this.httpService.getAllMetricData('Mood').subscribe((res) => {
      let tempData: Mood[] = [];
      let response: any[] = JSON.parse(JSON.stringify(res));
      for (let i = 0; i < response.length; i++) {
        tempData.push({ 'Day': this.utility.getDayNameInWeek(response[i].timestamp, true), 'MoodLevel': parseInt(response[i].datumValue) });
      }
      tempData = this.utility.formatGraphArray(tempData, "MoodLevel", true);
      console.log("after format", JSON.stringify(tempData));
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
    this.myStr = { "title": "Mood", "imgURL": "res://mood_grey", "isDialogVisible": this.isMakeNote };
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
      context: { screen: 'mood' }
    };

    this.modalDialogService.showModal(InfoComponent, options).then(() => {

    });
  }

  public trackMood() {
    this.routerExtensions.navigate(["/track/mood"]);
  }
  public moodPlaybook() {
    this.routerExtensions.navigate(["/myplaybook/mood"]);
  }

}

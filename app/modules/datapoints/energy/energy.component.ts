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

class Energy {
  constructor(public Day?: string, public EnergyLevel?: number) {
  }
}

@Component({
  moduleId: module.id,
  selector: 'app-energy',
  templateUrl: './energy.component.html',
  styleUrls: ['./energy.component.css']
})
export class EnergyComponent implements OnInit, OnDestroy {
  myStr: any;
  dataPointName: string = 'Energy';
  isMakeNote: boolean;
  graphData: Energy[];
  private _categoricalSource: ObservableArray<Energy>;
  constructor(page: Page, private _location: Location, private loader: Loader, private utility: Utility, private modalDialogService: ModalDialogService,
    private viewContainerRef: ViewContainerRef, private httpService: DataPointsHttpService, private routerExtensions: RouterExtensions) {
    page.actionBarHidden = true;
  }
  get categoricalSource(): ObservableArray<Energy> {
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
    this.httpService.getAllMetricData('Energy').subscribe((res) => {
      let tempData: Energy[] = [];
      let response: any[] = JSON.parse(JSON.stringify(res));
      console.log("response: ", JSON.stringify(res));
      for (let i = 0; i < response.length; i++) {
        tempData.push({ 'Day': this.utility.getDayNameInWeek(response[i].timestamp ,true), 'EnergyLevel': parseInt(response[i].datumValue) });
      }
      console.log("before format", JSON.stringify(tempData))
      tempData = this.utility.formatGraphArray(tempData, 'EnergyLevel', true);
      console.log("after format", JSON.stringify(tempData))
      this.graphData = tempData;
      this.loader.hide();
    }, (err) => {
      console.log("err", err)
      this.loader.hide();
    })
  }

  getCategoricalSource(): Energy[] {
    return [
      { Day: "Mon", EnergyLevel: 0 },
      { Day: "Tue", EnergyLevel: 3 },
      { Day: "Wed", EnergyLevel: 5 },
      { Day: "Thu", EnergyLevel: 3 },
      { Day: "Fri", EnergyLevel: 2 },
      { Day: "Sat", EnergyLevel: 5 },
      { Day: "Sun", EnergyLevel: 2 }
    ];
  }

  public goBack() {
    this._location.back();
  }

  public openNote() {
    this.isMakeNote = true;
    this.myStr = { "title": "Energy", "imgURL": "res://energy_grey", "isDialogVisible": this.isMakeNote };
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
      context: { screen: 'energy' }
    };

    this.modalDialogService.showModal(InfoComponent, options).then(() => {

    });
  }

  public trackEnergy() {
    this.routerExtensions.navigate(["/track/energy"]);
  }
  public energyPlaybook() {
    this.routerExtensions.navigate(["/myplaybook/energy"]);
  }
  

}
import { Component, ViewEncapsulation, ViewContainerRef, OnInit, OnDestroy } from "@angular/core";
import { Page } from "ui/page";
import { ModalDialogOptions } from 'nativescript-angular';
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { Location } from '@angular/common';
import { NotedialogboxComponent } from "../../../common/components/notedialogbox/notedialogbox.component";
import { TrackService } from "../track.service";
import { TrackHttpService } from './../track-http.service';
import { values } from './../../../common/constants/values.service';
import { Loader } from './../../../common/components/loader/loader.service';
import { ListPicker } from "ui/list-picker";
import { alert } from "ui/dialogs";
import { GC } from "utils/utils";
let focusList = values.focusList;
@Component({
  moduleId: module.id,
  encapsulation: ViewEncapsulation.None,
  selector: "app-playbook-focus",
  templateUrl: './focus.component.html',
  styleUrls: ['./focus.component.css']

})
export class FocusComponent implements OnInit, OnDestroy {
  date: Date;
  exactDate: Date;
  trackDone: boolean;
  disableNextDateBtn: boolean = true;
  public dataPointName: string;
  isMakeNote: boolean;
  listSelected: string;
  myStr: any;
  public focusList: Array<string>;
  constructor(private page: Page, private viewContainerRef: ViewContainerRef,
    private modalDialogService: ModalDialogService, private _location: Location,
    private trackService: TrackService, private trackHttpService: TrackHttpService,
    private loader: Loader) {
    this.date = new Date();
    this.dataPointName = "Focus";
    this.date.setHours(0);
    this.date.setMinutes(0);
    this.date.setSeconds(0);
    this.exactDate = new Date(this.date);
    page.actionBarHidden = true;
    this.focusList = [];
    for (let i = 0; i < focusList.length; i++) {
      this.focusList.push(focusList[i]);
    }
  }

  ngOnInit() {
  
    this.getTodayTrack();
  }

  ngOnDestroy() {
    GC();
  }

  getTodayTrack() {
    this.trackDone = false;
		this.trackHttpService.getTodayTrack("Focus",this.date.toISOString()).subscribe((res)=>{
      let response: any[] = JSON.parse(JSON.stringify(res));
      console.log("track respose ........",JSON.stringify(response));
			console.log("response????"+response.length)
			if(response.length != 0)  {
				console.log("length > 0.... Turned green"+response.length)
				this.trackDone = true; 
				
			}
			console.log('done:')
		}, (err)=> {
		

		})
	}


  prevDate() {
    this.date.setDate(this.date.getDate() - 1);
    this.disableNextDateBtn = false;
    this.getTodayTrack();
  }

  nextDate() {
    if (this.disableNextDateBtn) return;
    this.date.setDate(this.date.getDate() + 1)
    if (this.trackService.compareExactDate(this.exactDate, this.date) == 0) {
      this.disableNextDateBtn = true;
    }
    this.getTodayTrack();
  }

  done() {
    this.loader.show('Setting Focus Level..');
    this.trackHttpService.createMetricDatum(this.dataPointName, this.listSelected, this.date.toISOString())
      .subscribe((data) => {
        console.log("Success", JSON.stringify(data));
        this.trackDone = true; 
        this.loader.hide();
        let options = {
          title: "Success",
          message: "Focus level has been set succesfully!",
          okButtonText: "OK"
        };
        alert(options).then(() => {
          console.log("Race chosen!");
        });
      }, (err) => {
        console.log("Error", JSON.stringify(err));
        this.loader.hide();
        let options = {
          title: "Error",
          message: "Error in setting focus level!",
          okButtonText: "OK"
        };
        alert(options).then(() => {
          console.log("Race chosen!");
        });
      })
  }

  selectedIndexChanged(args) {
    let picker = <ListPicker>args.object;
    console.log("picker selection: " + picker.selectedIndex);
    this.listSelected = this.focusList[picker.selectedIndex];
  }

  getDateFormatString(_date: Date) {
    return (_date.getMonth() + 1) + "/" + _date.getDate() + "/" + _date.getFullYear();
  }

  public openNote() {
    this.isMakeNote = true;
    this.myStr = { "title": "Focus", "imgURL": "res://focus_grey", "isDialogVisible": this.isMakeNote };
    let options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      context: { data: this.myStr }
    };

    this.modalDialogService.showModal(NotedialogboxComponent, options).then(() => {

    });
  }

  public goBack() {
    this._location.back();
  }
  
}

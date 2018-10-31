import { Component, ViewEncapsulation, ViewContainerRef, OnInit } from "@angular/core";
import { Page } from "ui/page";
import { ModalDialogOptions } from 'nativescript-angular';
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { Location } from '@angular/common';
import { NotedialogboxComponent } from "../../../common/components/notedialogbox/notedialogbox.component";
import { TrackService } from "../track.service";
import { TrackHttpService } from './../track-http.service';
import { ListPicker } from "ui/list-picker";
import { alert } from "ui/dialogs";
import { Loader } from '../../../common/components/loader/loader.service';
import { GC } from "utils/utils";

let napList = ["7", "8", "9"];
let sleepList = ["Not rested", "Somewhat rested", "Rested"];

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.None,
    selector: "my-playbook-sleep",
    templateUrl: './sleep.component.html',
    styleUrls: ['./sleep.component.css']

})
export class PlayBookSleepComponent implements OnInit {
    date: Date;
    exactDate: Date;
    disableNextDateBtn: boolean = true;
    isMakeNote: boolean;
    public dataPointName: string;
    myStr: any;
    trackDone: boolean;
    durationHours: string;
    feel: string;
    public napList: Array<string>;
    public sleepList: Array<string>;
    constructor(private page: Page, private viewContainerRef: ViewContainerRef,
        private modalDialogService: ModalDialogService, private _location: Location,
        private trackService: TrackService, private trackHttpService: TrackHttpService, private loader: Loader) {
        this.date = new Date();
        this.date.setHours(0);
        this.date.setMinutes(0);
        this.date.setSeconds(0);
        this.exactDate = new Date(this.date);
        this.dataPointName = "Sleep";
        page.actionBarHidden = true;
        this.napList = [];
        for (let i = 0; i < napList.length; i++) {
            this.napList.push(napList[i]);
        }
        this.sleepList = [];
        for (let i = 0; i < sleepList.length; i++) {
            this.sleepList.push(sleepList[i]);
        }
    }

    public selectedIndexChangedN(args) {
        let duration = <ListPicker>args.object;
        console.log("picker selection: " + duration.selectedIndex);

        this.durationHours = this.napList[duration.selectedIndex];
    }

    public selectedIndexChangedS(args) {
        let fee = <ListPicker>args.object;
        console.log("picker selection: " + fee.selectedIndex);

        this.feel = this.napList[fee.selectedIndex];
    }
    ngOnInit()
    {
        this.getTodayTrack();
    }

    ngOnDestroy() {
        GC();
      }

    getTodayTrack() {
        this.trackDone = false;
		this.trackHttpService.getTodayTrack("Sleep",this.date.toISOString()).subscribe((res)=>{
            let response: any[] = JSON.parse(JSON.stringify(res));
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


    getDateFormatString(_date: Date) {
        return (_date.getMonth() + 1) + "/" + _date.getDate() + "/" + _date.getFullYear();
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

    public done() {
       
        this.loader.show('Setting Sleep data..');

        this.trackHttpService.createSleepDatum(this.dataPointName, this.feel, parseInt(this.durationHours), this.date.toISOString())
            .subscribe((res) => {
                console.log("success", JSON.stringify(res));
                this.trackDone = true; 
                this.loader.hide();
                let options = {
                    title: "Success",
                    message: "Sleep has been set succesfully!",
                    okButtonText: "OK"
                };
                alert(options).then(() => {
                    console.log("Race chosen!");
                });
            }, (err) => {
                console.log("ERR", JSON.stringify(err));
                this.loader.hide();
                let options = {
                    title: "Error",
                    message: "Error in setting Sleep!",
                    okButtonText: "OK"
                };
                alert(options).then(() => {
                    console.log("Race chosen!");
                });
            })

    }

    public goBack() {
        this._location.back();
    }
 

}



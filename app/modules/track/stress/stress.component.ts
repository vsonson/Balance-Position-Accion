import { Component, ViewEncapsulation, ViewContainerRef, OnInit } from "@angular/core";
import { Page } from "ui/page";
import { ModalDialogOptions } from 'nativescript-angular';
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { Location } from '@angular/common';
import { ListPicker } from "ui/list-picker";
import { NotedialogboxComponent } from "../../../common/components/notedialogbox/notedialogbox.component";
import { Track } from './../track-model';
import { TrackService } from "../track.service";
import { Loader } from '../../../common/components/loader/loader.service';
import { RouterExtensions } from "nativescript-angular/router";
import { TrackHttpService } from './../track-http.service';
import { alert } from "ui/dialogs";
import { GC } from "utils/utils";


let stressList = ["Not stressed", "Somewhat stressed", "Stressed"];
@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.None,
    selector: "app-drawer-items",
    templateUrl: './stress.component.html',
    styleUrls: ['./stress.component.css']

})
export class StressComponent implements OnInit {
    date: Date;
    exactDate: Date;
    disableNextDateBtn: boolean = true;
    public dataPointName: string;
    isMakeNote: boolean;
    trackDone:boolean;
    myStr: any;
    track: Track;
    value: String;
    public stressList: Array<string>;
    constructor(private page: Page, private viewContainerRef: ViewContainerRef,
        private modalDialogService: ModalDialogService, private _location: Location,
        private trackService: TrackService, private trackHttpService: TrackHttpService, private routerExtensions: RouterExtensions,
        private loader: Loader) {
        this.track = new Track()
        this.date = new Date();
        this.date.setHours(0);
        this.date.setMinutes(0);
        this.date.setSeconds(0);
        this.dataPointName = "Stress";
        this.exactDate = new Date(this.date);
        this.track.timestamp = this.date;
        page.actionBarHidden = true;
        this.stressList = [];
        for (let i = 0; i < stressList.length; i++) {
            this.stressList.push(stressList[i]);
        }
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
		this.trackHttpService.getTodayTrack("Stress",this.date.toISOString()).subscribe((res)=>{
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
        this.track.timestamp = this.date;
        this.disableNextDateBtn = false;
        this.getTodayTrack();
    }

    nextDate() {
        if (this.disableNextDateBtn) return;
        this.date.setDate(this.date.getDate() + 1);
        this.track.timestamp = this.date;
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
        this.myStr = { "title": "Stress", "imgURL": "res://stress_grey", "isDialogVisible": this.isMakeNote };
        let options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: false,
            context: { data: this.myStr }
        };

        
        this.modalDialogService.showModal(NotedialogboxComponent, options).then(() => {

        });
    }


    public selectedIndexChanged(args) {
        let picker = <ListPicker>args.object;
        console.log(args.object);
        console.log(this.stressList[picker.selectedIndex]);
        this.track.value = this.stressList[picker.selectedIndex];
    }

    public goBack() {
        this._location.back();
    }

    done() {
        this.loader.show('Setting Focus Level..');
        this.trackHttpService.createStressDatum(this.dataPointName, this.track.value, this.date.toISOString())
            .subscribe((data) => {
                console.log("Success", JSON.stringify(data));
                this.trackDone = true;
                this.loader.hide();
                let options = {
                    title: "Success",
                    message: "Stress has been set succesfully!",
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
                    message: "Error in setting Stress!",
                    okButtonText: "OK"
                };
                alert(options).then(() => {
                    console.log("Race chosen!");
                });
            })
    }
   

}



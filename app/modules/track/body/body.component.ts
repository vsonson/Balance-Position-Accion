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

let headacheList = ["No", "Mild", "Severe"];
let digestiveList = ["No", "Mild", "Severe"];

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.None,
    selector: "app-body-playbook",
    templateUrl: './body.component.html',
    styleUrls: ['./body.component.css']


})
export class BodyComponent implements OnInit {
    date: Date;
    exactDate: Date;

    trackDone: boolean;
    disableNextDateBtn: boolean = true;
    isMakeNote: boolean;
    myStr: any;
    public dataPointName: string;
    public headache: string;
    public datumValue: string;

    public headacheList: Array<string>;
    public digestiveList: Array<string>;
    constructor(private page: Page, private viewContainerRef: ViewContainerRef,
        private modalDialogService: ModalDialogService, private _location: Location,
        private trackService: TrackService, private trackHttpService: TrackHttpService, private loader: Loader) {
        this.date = new Date();
        this.dataPointName = "Body";
        this.date.setHours(0);
        this.date.setMinutes(0);
        this.date.setSeconds(0);

        this.exactDate = new Date(this.date);
        page.actionBarHidden = true;
        this.headacheList = [];
        for (let i = 0; i < headacheList.length; i++) {
            this.headacheList.push(headacheList[i]);
        }
        this.digestiveList = [];
        for (let i = 0; i < digestiveList.length; i++) {
            this.digestiveList.push(digestiveList[i]);
        }
    }

    public selectedIndexChangedH(args) {
        let headachePicker = <ListPicker>args.object;


        this.headache = this.headacheList[headachePicker.selectedIndex];

    }
    public selectedIndexChangedD(args) {
        let digestivePicker = <ListPicker>args.object;

        console.log("digestive selection: " + digestivePicker.selectedIndex);
        this.datumValue = this.digestiveList[digestivePicker.selectedIndex];
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
		this.trackHttpService.getTodayTrack("Body",this.date.toISOString()).subscribe((res)=>{
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
        // if (this.trackService.compareExactDate(this.exactDate, this.date) == 1 || this.trackService.compareExactDate(this.exactDate, this.date) == 0)
        if ( this.trackService.compareExactDate(this.exactDate, this.date) == 0) {
            this.disableNextDateBtn = true;
        }
        this.getTodayTrack();
    }


    getDateFormatString(_date: Date) {
        return (_date.getMonth() + 1) + "/" + _date.getDate() + "/" + _date.getFullYear();
    }

    public openNote() {
        this.isMakeNote = true;
        this.myStr = { "title": "Body", "imgURL": "res://body_grey", "isDialogVisible": this.isMakeNote };
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

    done() {
        this.loader.show('Setting Body data..');
        this.trackHttpService.createBodyDatum(this.dataPointName, this.datumValue, this.headache, this.date.toISOString())
            .subscribe((res) => {
                console.log("success", JSON.stringify(res));
                this.trackDone = true; 
                this.loader.hide();
                let options = {
                    title: "Success",
                    message: "Body has been set succesfully!",
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
                    message: "Error in setting Body!",
                    okButtonText: "OK"
                };
                alert(options).then(() => {
                    console.log("Race chosen!");
                });
            })
    }
    

}



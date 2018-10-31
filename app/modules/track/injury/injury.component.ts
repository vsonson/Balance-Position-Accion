import { Component, ViewEncapsulation, ViewContainerRef, OnInit, OnDestroy } from "@angular/core";
import { Page } from "ui/page";
import { ModalDialogOptions } from 'nativescript-angular';
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { Location } from '@angular/common';
import { NotedialogboxComponent } from "../../../common/components/notedialogbox/notedialogbox.component";
import { TrackService } from "../track.service";
import { TrackHttpService } from './../track-http.service';
import { ListPicker } from "ui/list-picker";
import { Loader } from './../../../common/components/loader/loader.service';
import { alert } from "ui/dialogs";
import { GC } from "utils/utils";


let injuryList = ["No", "Nagging but still playing", "unable to play"];

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.None,
    selector: "app-playbook-injury",
    templateUrl: './injury.component.html',
    styleUrls: ['./injury.component.css']

})
export class InjuryComponent implements OnInit, OnDestroy {
    date: Date;
    exactDate: Date;
    disableNextDateBtn: boolean = true;
    isMakeNote: boolean;
    public dataPointName: string;
    public injury: string;
    trackDone: boolean;
    myStr: any;
    public injuryList: Array<string>;
    constructor(private page: Page, private viewContainerRef: ViewContainerRef,
        private modalDialogService: ModalDialogService, private _location: Location,
        private trackService: TrackService, private trackHttpService: TrackHttpService, private loader: Loader) {
        this.date = new Date();
        this.date.setHours(0);
        this.date.setMinutes(0);
        this.date.setSeconds(0);
        this.dataPointName = "Injury";
        this.exactDate = new Date(this.date);
        page.actionBarHidden = true;
        this.injuryList = [];
        for (let i = 0; i < injuryList.length; i++) {
            this.injuryList.push(injuryList[i]);
        }
    }

    ngOnInit() {
        this.getTodayTrack();
        this.loader.show("Loading..");
    }

    getTodayTrack() {
        this.trackDone = false;
		this.trackHttpService.getTodayTrack("Injury",this.date.toISOString()).subscribe((res)=>{
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

    ngOnDestroy() {
        GC();
    }

    public selectedIndexChanged(args) {
        let picker = <ListPicker>args.object;
        console.log("picker selection: " + picker.selectedIndex);

        this.injury = this.injuryList[picker.selectedIndex];

    }
    done() {
        this.loader.show('Setting injury Level..');
        this.trackHttpService.createInjuryDatum(this.dataPointName, this.injury, this.date.toISOString())
            .subscribe((data) => {
                console.log("Success", JSON.stringify(data));
                this.trackDone = true; 
                this.loader.hide();
                let options = {
                    title: "Success",
                    message: "Injury level has been set succesfully!",
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
                    message: "Error in setting injury!",
                    okButtonText: "OK"
                };
                alert(options).then(() => {
                    console.log("Race chosen!");
                });
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
        this.myStr = { "title": "Injury", "imgURL": "res://injury_grey", "isDialogVisible": this.isMakeNote };
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


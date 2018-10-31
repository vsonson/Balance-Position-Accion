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
let interestList = ["Not interested in any activities", "interested in some but not all", "Interested in most of them"];
@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.None,
    selector: "app-playbook-items",
    templateUrl: './interest.component.html',
    styleUrls: ['./interest.component.css']

})
export class InterestComponent implements OnInit, OnDestroy {
    date: Date;
    exactDate: Date;
    disableNextDateBtn: boolean = true;
    isMakeNote: boolean;
    trackDone: boolean;
    public dataPointName: string;
    public interest: string;
    myStr: any;
    public interestList: Array<string>;
    constructor(private page: Page, private viewContainerRef: ViewContainerRef,
        private modalDialogService: ModalDialogService, private _location: Location,
        private trackService: TrackService, private trackHttpService: TrackHttpService, private loader: Loader) {
        this.date = new Date();
        console.log("today",this.date);
        this.date.setHours(0);
        this.date.setMinutes(0);
        this.date.setSeconds(0);
        console.log("today set",this.date.toISOString());
        this.dataPointName = "Interest";
        this.exactDate = new Date(this.date);
        console.log("today exact",this.exactDate.toISOString());
        page.actionBarHidden = true;
        this.interestList = [];
        for (let i = 0; i < interestList.length; i++) {
            this.interestList.push(interestList[i]);
        }
    }




    public selectedIndexChanged(args) {
        let picker = <ListPicker>args.object;
        console.log("picker selection: " + picker.selectedIndex);

        this.interest = this.interestList[picker.selectedIndex];

    }

    ngOnInit() {
    
        this.loader.show("Loading..");
        this.getTodayTrack();
    }
    ngOnDestroy() {
        GC();
    }
    getTodayTrack() {
        this.trackDone = false;
		this.trackHttpService.getTodayTrack("Interest",this.date.toISOString()).subscribe((res)=>{
			console.log("result:" , JSON.stringify(res))
            let response: any[] = JSON.parse(JSON.stringify(res));
            console.log("track respose ........",JSON.stringify(res));
			console.log("bytelength", res.byteLength)
			if(response.length != 0)  {
				console.log("length > 0.... Turned green"+response.length)
				this.trackDone = true; 
				
			}
			console.log('done:')
		}, (err)=> {
		

		})
	}


    done() {
        this.loader.show('Setting Injury Level..');
        this.trackHttpService.createInterestDatum(this.dataPointName, this.interest, this.date.toISOString())
            .subscribe((data) => {
                console.log("Success", JSON.stringify(data));
                this.trackDone = true; 
                this.loader.hide();
                let options = {
                    title: "Success",
                    message: "Interest has been set succesfully!",
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
                    message: "Error in setting Interest!",
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
        this.myStr = { "title": "Interest", "imgURL": "res://interest_grey", "isDialogVisible": this.isMakeNote };
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

import { Component, ViewEncapsulation, OnInit, ViewContainerRef } from "@angular/core";
import { Page } from "ui/page";
import { Location } from '@angular/common';
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular";
import { NotedialogboxComponent } from "../../../common/components/notedialogbox/notedialogbox.component";
import { Track } from './../track-model';
import { TrackService } from './../track.service';
import { TrackHttpService } from './../track-http.service';
import { RouterExtensions } from "nativescript-angular/router";
import { Loader } from '../../../common/components/loader/loader.service';
import { alert } from "ui/dialogs";
import { GC } from "utils/utils";


@Component({
	moduleId: module.id,
	selector: "app-track-items",
	//providers: [ TrackService ],
	templateUrl: './mood.component.html',
	styleUrls: ['./mood.component.css']
})
export class MoodComponent implements OnInit {

	date: Date;
	exactDate: Date;
	disableNextDateBtn: boolean = true;
	myStr: any;
	public dataPointName: string;
	isMakeNote: boolean;
	trackDone: boolean;
	moodLevel: number = 0;
	track: Track;
	constructor(
		private trackService: TrackService,
		page: Page,
		private _location: Location,
		private modalDialogService: ModalDialogService,
		private viewContainerRef: ViewContainerRef,
		private routerExtensions: RouterExtensions,
		private loader: Loader,
		private trackHttpService: TrackHttpService
	) {
		this.track = new Track()
		this.date = new Date();
		this.dataPointName = "Mood";
		this.date.setHours(0);
		this.date.setMinutes(0);
		this.date.setSeconds(0);
		this.track.timestamp = this.date;
		this.exactDate = new Date(this.date);

		page.actionBarHidden = true;
	}

	ngOnInit() {
		this.getTodayTrack();
	}

	ngOnDestroy() {
		GC();
	  }

	getTodayTrack() {
		this.trackDone = false;
		this.trackHttpService.getTodayTrack("Mood",this.date.toISOString()).subscribe((res)=>{
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
		this.date.setDate(this.date.getDate() + 1)
		if (this.trackService.compareExactDate(this.exactDate, this.date) == 0) {
			this.disableNextDateBtn = true;
		}
		this.getTodayTrack();
	}


	getDateFormatString(_date: Date) {
		return (_date.getMonth() + 1) + "/" + _date.getDate() + "/" + _date.getFullYear();
	}


	public goBack() {
		this._location.back();
	}

	public done() {
	
		this.loader.show('Setting Mood..');

		this.trackHttpService.createMoodDatum(this.dataPointName, this.track.value, this.track.timestamp.toISOString())
			.subscribe((res) => {
				console.log("success", JSON.stringify(res));
				this.trackDone = true;
				this.loader.hide();
				let options = {
					title: "Success",
					message: "Mood has been set succesfully!",
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
					message: "Error in setting Mood!",
					okButtonText: "OK"
				};
				alert(options).then(() => {
					console.log("Race chosen!");
				});
			})

	}

	public selectMood(moodType, level: number) {
		console.log("moodtype", moodType);
		this.moodLevel = level;
		this.track.value = moodType
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
	

}


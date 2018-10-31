import { Component, OnInit, OnDestroy } from '@angular/core';
import { Page } from "ui/page";
import { Location } from '@angular/common';
import { GC } from "utils/utils";

@Component({
  moduleId: module.id,
  selector: 'app-moodtrack-view',
  templateUrl: './moodtrack-view.component.html',
  styleUrls: ['./moodtrack-view.component.scss']
})
export class MoodtrackViewComponent implements OnInit, OnDestroy {
  myStr: any;
  isMakeNote: boolean;
  constructor(page: Page, private _location: Location) {
    page.actionBarHidden = true;
  }

  ngOnInit() {
    
  }
  ngOnDestroy() {
    GC();
  }

  public goBack() {
    this._location.back();
  }

  public done() {
    console.log("Done button clicked");
  }
  public awful() {
    console.log("awful clicked");
  }
  public bad() {
    console.log("bad clicked");
  }
  public ehhh() {
    console.log("ehhh clicked");
  }
  public good() {
    console.log("good clicked");
  }
  public great() {
    console.log("great clicked");
  }
  public openNote() {
    this.isMakeNote = true;
    this.myStr = { "title": "Mood", "imgURL": "res://mood_grey", "isDialogVisible": this.isMakeNote };
  }
}

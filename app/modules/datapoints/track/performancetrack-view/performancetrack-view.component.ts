import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { Page } from "ui/page";
import { NotedialogboxComponent } from '../../../../common/components/notedialogbox/notedialogbox.component';
import { ModalDialogOptions } from 'nativescript-angular';
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { Location } from '@angular/common';
import { GC } from "utils/utils";

let performanceList = ["Poorly", "Just okay", "Good"];
@Component({
  moduleId: module.id,
  selector: 'app-performancetrack-view',
  templateUrl: './performancetrack-view.component.html',
  styleUrls: ['./performancetrack-view.component.scss']
})

export class PerformancetrackViewComponent implements OnInit {
  isMakeNote: boolean;
  myStr: any;
  public performanceList: Array<string>;
  constructor(private page: Page, private viewContainerRef: ViewContainerRef,
    private modalDialogService: ModalDialogService, private _location: Location) {
    page.actionBarHidden = true;
    this.performanceList = [];
    for (let i = 0; i < performanceList.length; i++) {
      this.performanceList.push(performanceList[i]);
    }
  }

  ngOnInit() {
    GC();
  }

  ngOnDestroy() {
    GC();
  }

  public openNote() {
    this.isMakeNote = true;
    this.myStr = { "title": "Performance", "imgURL": "res://performance_grey", "isDialogVisible": this.isMakeNote };
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

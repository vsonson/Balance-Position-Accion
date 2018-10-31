import { Component, OnInit, ViewContainerRef, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { ListPicker } from "ui/list-picker";
import { topmost } from "ui/frame";
import { SwipeGestureEventData } from "ui/gestures";
import * as dockModule from "tns-core-modules/ui/layouts/dock-layout";
import { FlexboxLayout } from 'ui/layouts/flexbox-layout';
import { AnimationCurve } from 'ui/enums';
import { AnimationDefinition, Animation } from 'ui/animation';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { Page } from "ui/page";
import { CheckBox } from 'nativescript-checkbox';
import { CheckboxOption } from "./checkbox-option";
import { GC } from "utils/utils";

let view: FlexboxLayout;



var enums = require("ui/enums");




@Component({
  moduleId: module.id,
  selector: 'myDataModal',
  templateUrl: './myDataModal.component.html',
  styleUrls: ['./myDataModal.component.css']
})
export class MyDataModalComponent implements OnInit, OnDestroy {
  checkboxOptions?: Array<CheckboxOption>;
  checkTest: boolean;
  // public pdf: boolean = false;
  // public csv: boolean = false;

  constructor(private modalDialogParams: ModalDialogParams, private modalDialogService: ModalDialogService,
    private viewContainerRef: ViewContainerRef) {
    let params = this.modalDialogParams.context;
  }

  close() {
    this.modalDialogParams.closeCallback(true);
  }

  ngOnInit() {
    GC();
    this.checkboxOptions = [
      new CheckboxOption("Test 1"),
      new CheckboxOption("Test 2"),
      new CheckboxOption("Test 3"),
      new CheckboxOption("Test 4"),
      new CheckboxOption("Test 5"),
      new CheckboxOption("Test 6"),
      new CheckboxOption("Test 7"),
      new CheckboxOption("Test 8"),
      new CheckboxOption("Test 9"),
      new CheckboxOption("Test 0")
    ];
  }

  ngOnDestroy() {
    GC();
  }


  public onSelectedIndexChange(args) {

    // if (this.pdf == false) {
    //   this.pdf=true;
    //   this.csv=false;
    //   this.checkboxOptions = [
    //     new CheckboxOption("Test 1"),
    //     new CheckboxOption("Test 2"),
    //     new CheckboxOption("Test 3")
    //   ];
    // } else if (this.csv == false) {
    //   this.pdf=false;
    //   this.csv=true;
    //   this.checkboxOptions = [
    //     new CheckboxOption("Test 4"),
    //     new CheckboxOption("Test 5"),
    //     new CheckboxOption("Test 6")
    //   ];
    // }
  }


  sendInfo() {
    console.log(JSON.stringify(this.checkboxOptions));
  }

  changeChecked(checkboxOption: CheckboxOption, modelRef): void {
    this.checkboxOptions.forEach(option => {
      if (option.text === checkboxOption.text) {
        option.selected = modelRef.checked;
      }
    });

    console.log(JSON.stringify(this.checkboxOptions));

  }

}
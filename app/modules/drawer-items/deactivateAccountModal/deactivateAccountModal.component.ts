import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { ListPicker } from "ui/list-picker";
import { topmost } from "ui/frame";
import { SwipeGestureEventData } from "ui/gestures";
import * as dockModule from "tns-core-modules/ui/layouts/dock-layout";
import { FlexboxLayout } from 'ui/layouts/flexbox-layout';
import { AnimationCurve } from 'ui/enums';
import { AnimationDefinition, Animation } from 'ui/animation';
import { DeactivateFormModalComponent } from "../deactivateFormModal/deactivateFormModal.component";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { Page } from "ui/page";
import { GC } from "utils/utils";

let view: FlexboxLayout;



var enums = require("ui/enums");




@Component({
  moduleId: module.id,
  selector: 'deactivateAccount-modal',
  templateUrl: './deactivateAccountModal.component.html',
  styleUrls: ['./deactivateAccountModal.component.scss']
})
export class DeactivateAccountModalComponent implements OnInit, OnDestroy {



  constructor(private modalDialogParams: ModalDialogParams, private modalDialogService: ModalDialogService,
    private viewContainerRef: ViewContainerRef) {
    let params = this.modalDialogParams.context;
  }

  close() {
    this.modalDialogParams.closeCallback(true);

  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    GC();
  }


}
import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { ListPicker } from "ui/list-picker";
import { topmost } from "ui/frame";
import { SwipeGestureEventData } from "ui/gestures";
import * as dockModule from "tns-core-modules/ui/layouts/dock-layout";
import { FlexboxLayout } from 'ui/layouts/flexbox-layout';
import { AnimationCurve } from 'ui/enums';
import { AnimationDefinition, Animation } from 'ui/animation';
import { DeactivateModalComponent } from "../deactivateModal/deactivateModal.component";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { Page } from "ui/page";
import { GC } from "utils/utils";
import {Router} from "@angular/router";

let view: FlexboxLayout;



var enums = require("ui/enums");




@Component({
  moduleId: module.id,
  selector: 'deactivateAccount-modal',
  templateUrl: './deactivateFormModal.component.html',
  styleUrls: ['./deactivateFormModal.component.scss']
})
export class DeactivateFormModalComponent implements OnInit, OnDestroy {



  constructor(private modalDialogParams: ModalDialogParams, private modalDialogService: ModalDialogService,
    private viewContainerRef: ViewContainerRef,private router:Router) {
    let params = this.modalDialogParams.context;
  }

  close() {
    // this.router.navigate(["auth/signin"]);
    this.modalDialogParams.closeCallback(true);

  }

  ngOnInit() {
  
  }
  ngOnDestroy() {
    GC();
  }



}
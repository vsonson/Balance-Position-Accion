import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { ListPicker } from "ui/list-picker";
import { topmost } from "ui/frame";
import { SwipeGestureEventData } from "ui/gestures";
import * as dockModule from "tns-core-modules/ui/layouts/dock-layout";
import { FlexboxLayout } from 'ui/layouts/flexbox-layout';
import { AnimationCurve } from 'ui/enums';
import { AnimationDefinition, Animation } from 'ui/animation';
import { GC } from "utils/utils";

let view: FlexboxLayout;



var enums = require("ui/enums");




@Component({
  moduleId: module.id,
  selector: 'deactivate-modal',
  templateUrl: './deactivateModal.component.html',
  styleUrls: ['./deactivateModal.component.scss']
})
export class DeactivateModalComponent implements OnInit, OnDestroy {
public name:String;
public password:String;
public repeatPassword:String;
public validationEmail:Boolean;
public validationPassword:Boolean;
public validationRepeat:Boolean;


  constructor(private modalDialogParams: ModalDialogParams) {
    let params = this.modalDialogParams.context;
    this.validationEmail=true;
      this.validationPassword=true;
      this.validationRepeat=true;
    
  }

  close(force) {
    if(force) this.modalDialogParams.closeCallback(false);
    if (this.name==null)
    {
      this.validationEmail=false;
    }
    else if(this.password==null)
    {
      this.validationPassword=false;
    }
    else if(this.repeatPassword!=this.password)
    {
      this.validationRepeat=false;
    }
        else{
          this.validationEmail=true;
          this.validationPassword=true;
          this.validationRepeat=true;
          this.modalDialogParams.closeCallback(true);
        }
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    GC();
  }
}
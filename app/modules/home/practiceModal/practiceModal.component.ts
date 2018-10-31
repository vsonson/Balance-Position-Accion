import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { ListPicker } from "ui/list-picker";
import { topmost } from "ui/frame";
import { SwipeGestureEventData } from "ui/gestures";
import * as dockModule from "tns-core-modules/ui/layouts/dock-layout";
import { FlexboxLayout } from 'ui/layouts/flexbox-layout';
import { RouterExtensions } from "nativescript-angular";

import { GC } from "utils/utils";

let view: FlexboxLayout;



var enums = require("ui/enums");


let diff = ["Not at all","Some what difficult", "Difficult"];
let mind = ["Not Mindful","Somewhat Mindful", "Most mindful"];

let isClassVisible=false;




@Component({
  moduleId: module.id,
  selector: 'app-modal',
  templateUrl: './practiceModal.component.html',
  styleUrls: ['./practiceModal.component.scss']
})
export class PracticeModal implements OnInit {
  public diff: Array<string>;
  public mind: Array<string>;
  
  public picked: string;
  
  public selectedIndex = 0;

  constructor( private modalDialogParams: ModalDialogParams,private routerExtensions: RouterExtensions) {

    
    let params = this.modalDialogParams.context;
    this.diff = [];
    this.mind = [];
    
    for (let i = 0; i < diff.length; i++) {
      this.diff.push(diff[i]);
    }
    for (let i = 0; i < mind.length; i++) {
      this.mind.push(mind[i]);
    }
    
    
  }
  close() {
    this.modalDialogParams.closeCallback();
  }
  gotoNotebook()
    {
        this.routerExtensions.navigate(["/home/notebook"]);
        this.close();
    }
  public selectedIndexChanged(args,userInfoparam) {
    let picker = <ListPicker>args.object;
    console.log(args.object);


  
      
      
    } 
  
  onTap() {


  }
  

  ngOnInit() { }
   doGC(): void {
    GC();
  }

}
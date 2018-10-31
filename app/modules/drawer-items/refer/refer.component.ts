import { Component,ViewContainerRef, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef, ViewEncapsulation } from "@angular/core";
import { Page } from "ui/page";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer, SideDrawerLocation } from 'nativescript-ui-sidedrawer';
import { ReferModalComponent } from "../referModal/referModal.component";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { GC } from "utils/utils";
import { Navigation } from './../../../common/services/common.service';
import { RouterExtensions } from 'nativescript-angular/router';


@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.None,
    selector: "app-dashboard",
    templateUrl: './refer.component.html'
})
export class ReferComponent  {

    constructor(
            page: Page,private modalDialogService: ModalDialogService,
        private viewContainerRef: ViewContainerRef,
        private router: RouterExtensions,
        private navigation: Navigation
        ) {
        page.actionBarHidden = true;
    }

    goBack() {
        this.router.navigate(['/home/dashboard']);
      }

     openDeactivateModal() {
        let options: ModalDialogOptions = {
         viewContainerRef: this.viewContainerRef,
         fullscreen: false,
         context: {data: 'something'}
       };
   
       this.modalDialogService.showModal(ReferModalComponent, options).then(()=>{

           
           // console.log(ev)
       });
     }

     
}
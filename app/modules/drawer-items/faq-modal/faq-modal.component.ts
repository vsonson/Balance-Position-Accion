import { Component,ViewContainerRef } from '@angular/core';
import { SwipeGestureEventData } from "ui/gestures";
import * as dockModule from "tns-core-modules/ui/layouts/dock-layout";
import { FlexboxLayout } from 'ui/layouts/flexbox-layout';
import { AnimationCurve } from 'ui/enums';
import { AnimationDefinition, Animation } from 'ui/animation';
import { Page } from "ui/page";
import { RouterExtensions } from "nativescript-angular/router";
import { FAQ1ModalComponent } from "./../faq-1-modal/faq-1-modal.component";
import { FAQ2ModalComponent } from "../faq2modal/faq2modal.component";
import { FAQ3ModalComponent } from "../faq3modal/faq3modal.component";
import { FAQ4ModalComponent } from "../faq4modal/faq4modal.component";
import { FAQ5ModalComponent } from "../faq5modal/faq5modal.component";
import { FAQ6ModalComponent } from "../faq6modal/faq6modal.component";
import { FAQ7ModalComponent } from "../faq7modal/faq7modal.component";
import { FAQ8ModalComponent } from "../faq8modal/faq8modal.component";
import { FAQ9ModalComponent } from "../faq9modal/faq9modal.component";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";




@Component({
  moduleId: module.id,
  selector: 'deactivateAccount-modal',
  templateUrl: './faqModal.component.html',
  styleUrls: ['./faqModal.component.scss']
})
export class FAQModalComponent {

  constructor(
          page: Page,private modalDialogService: ModalDialogService,
        private viewContainerRef: ViewContainerRef,
        private routerExtensions: RouterExtensions,
      ) {
      page.actionBarHidden = true;
  }
 

  close() {
    this.routerExtensions.navigate(["/home/dashboard"]);
  }

  openFAQ(componentName) {
    let options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      context: {data: 'something'}
    };

    this.modalDialogService.showModal(componentName, options).then(()=>{

    });
  }
  
  openFAQ1() {
      this.openFAQ(FAQ1ModalComponent,);
  }
  
  openFAQ2() {
    this.openFAQ(FAQ2ModalComponent);      
  }
  
  openFAQ3() {
    this.openFAQ(FAQ3ModalComponent);
  }
    
  openFAQ4() {
    this.openFAQ(FAQ4ModalComponent);
  }
     
  openFAQ5() {
    this.openFAQ(FAQ5ModalComponent);     
  }

  openFAQ6() {
    this.openFAQ(FAQ6ModalComponent);
  }

  openFAQ7() {
    this.openFAQ(FAQ7ModalComponent);      
  }

  openFAQ8() {
    this.openFAQ(FAQ8ModalComponent);
  }

  openFAQ9() {
    this.openFAQ(FAQ9ModalComponent);
  }

}
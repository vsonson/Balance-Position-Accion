import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { Page } from 'tns-core-modules/ui/page/page';
import { Color } from "tns-core-modules/color";
import { GC } from "utils/utils";

@Component({
  moduleId: module.id,
  selector: 'app-notedialogbox',
  templateUrl: './notedialogbox.component.html',
  styleUrls: ['./notedialogbox.component.scss'],

})
export class NotedialogboxComponent implements OnInit, OnDestroy {


  // @Input() dialogData: any;

  makeNoteLabel: string;
  isVisible: boolean;
  imgURL: string;
  constructor(private page: Page, private params: ModalDialogParams) {
    this.makeNoteLabel = params.context.data.title;
    // this.isVisible = params.context.data.title.isDialogVisible;
    this.imgURL = params.context.data.imgURL;
    this.page.on('loaded', args => {
      (<Page>args.object).backgroundColor = new Color('#00000000');
    });
  }
  public saveNoteBook() {
    // if(this.isVisible) {
    //   this.isVisible = false;

    // }

    //Call API and close the dialog
    this.closeDialog();
  }

  public closeDialog() {
    console.log("Close Dialog");
    this.params.closeCallback();
  }

  ngOnInit() {
    GC();
  }

  ngOnDestroy() {
    GC();
  }
}

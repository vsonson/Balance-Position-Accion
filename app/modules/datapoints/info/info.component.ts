import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { GC } from "utils/utils";

@Component({
  moduleId: module.id,
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit, OnDestroy {
  screen: string;
  constructor(
    private params: ModalDialogParams
  ) { }

  ngOnInit() {
  
    console.log(JSON.stringify(this.params));
    this.screen = this.params.context.screen;
  }

  ngOnDestroy() {
    GC();
  }
  close() {
    this.params.closeCallback();
  }
  doGC(): void {
    GC();
  }

}

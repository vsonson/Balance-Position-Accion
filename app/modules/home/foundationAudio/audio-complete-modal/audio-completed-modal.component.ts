import { Component, ViewContainerRef, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { Page } from "ui/page";

@Component({
    moduleId: module.id,
    templateUrl: "./audio-completed-modal.component.html",
    styleUrls: ["./audio-completed-modal.component.css"]
})
export class AudioCompleteModal implements OnInit {
    constructor(private _params: ModalDialogParams, private _page: Page, private router: RouterExtensions) { }

    ngOnInit(): void {}

    onBack(): void {
        this.router.back();
    }
    onClose(): void {
        this._params.closeCallback("return value");
    }
}
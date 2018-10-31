import { Injectable, OnDestroy } from "@angular/core";
import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef, ViewEncapsulation } from "@angular/core";
import { Page } from "ui/page";
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { TimePicker } from "ui/time-picker";
import { confirm } from "ui/dialogs";
import { constants } from '../../../common/constants/messages';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { GC } from "utils/utils";

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.None,
    templateUrl: 'timepicker.component.html',
    styleUrls: ['./timepicker.component.scss']
})

@Injectable()
export class TimePickerComponent implements OnInit, OnDestroy {
    public frameworks: Array<string>
    public timePicker: any
    public selTrackTime: string
    public prevData: string
    public timepickerLabel: string
    constantsMessage: any = constants;
    public constructor(private params: ModalDialogParams, private routerExtensions: RouterExtensions,
    ) {
        this.prevData = params.context.data
        this.timepickerLabel = params.context.reminderLabel
    }

    ngOnInit() {
        
    }

    ngOnDestroy() {
        GC();
    }

    onPickerLoaded(args) {
        this.timePicker = <TimePicker>args.object;
        var currentDate = new Date()
        this.timePicker.hour = currentDate.getHours();
        this.timePicker.minute = currentDate.getMinutes();
    }

    onTimeChanged(args) {
        console.log(args.value);
        this.selTrackTime = args.value;
    }

    selectedTime() {
        console.log(this.selTrackTime);

        let options = {
            title: this.constantsMessage.alert,
            message: "Are you sure you want to update the reminder?",
            okButtonText: "Yes",
            cancelButtonText: "No",
        };

        confirm(options).then((result: boolean) => {
            if (result) {
                this.params.closeCallback({ selTime: this.selTrackTime, status: "new" });
            }
            else {
                this.params.closeCallback({ selTime: this.prevData, status: "previous" });
            }
        });

    }

    public close() {
        this.params.closeCallback({ selTime: this.prevData, status: "previous" });
    }

}
// << sidedrawer-getting-started-angular

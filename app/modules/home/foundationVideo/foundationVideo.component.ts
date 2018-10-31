import { Component, ViewContainerRef, AfterViewChecked, NgZone } from "@angular/core";
import { Page } from "ui/page";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer, SideDrawerLocation } from 'nativescript-ui-sidedrawer';
import { registerElement } from "nativescript-angular/element-registry";
import { Video } from 'nativescript-videoplayer';
import { topmost } from 'tns-core-modules/ui/frame';
import { PracticeModal } from '../practiceModal/practiceModal.component';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { RouterExtensions } from 'nativescript-angular/router';





registerElement("VideoPlayer", () => Video);


@Component({
    moduleId: module.id,
    selector: "app-dashboard",
    templateUrl: './foundationVideo.component.html'
})
export class FoundationVideo implements AfterViewChecked {

    public play: boolean;
    public video: any;
    public videoStatus: string = 'start';
    public videoPlayTime: any = null;
    modalOpened : boolean;

    constructor(
        page: Page, private modalDialogService: ModalDialogService, private viewContainerRef: ViewContainerRef,
        private ngZone: NgZone,
        private router: RouterExtensions
    ) {
        page.actionBarHidden = true;
        this.play = false;
    }

    playAudio() {
        this.videoStatus = 'playing';
        this.video.play();
    }

    ngAfterViewChecked() {
        this.video = topmost().currentPage.getViewById('nativeVideoPlayer');
        this.video.on(Video.pausedEvent, () => {
            console.log("pause")
            this.ngZone.run(() => {
                this.videoStatus = 'pause';
                this.videoPlayTime = this.video.getCurrentTime();
            })

        });
        this.video.on(Video.playbackStartEvent, () => {
            this.ngZone.run(() => {
                this.videoStatus = 'playing';
                if (this.videoPlayTime)
                    this.video.seekToTime(this.videoPlayTime);
            })

        });

        this.video.on(Video.finishedEvent, () => {   //video end event
           if(this.video.getCurrentTime() != 0)  {
               this.openPracticeModal();
           }
            

        });

    }
    onPause() {
        console.log("pause");
    }

    pause()
    {
        this.video.pause();
        this.router.navigate(["/home/practice"], { clearHistory: true });
    }

    openPracticeModal() {
        if(this.modalOpened) return;
        this.modalOpened = true;
        let options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: false,
            context: { data: 'something' }
        };

        this.modalDialogService.showModal(PracticeModal, options).then(() => {
            this.modalOpened = false;
            this.router.back();
            // console.log(ev)
        });
    }




}
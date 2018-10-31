import { Component, ViewContainerRef, AfterViewChecked, NgZone, OnDestroy } from "@angular/core";
import { Page } from "ui/page";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { ActivatedRoute } from "@angular/router";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer, SideDrawerLocation } from 'nativescript-ui-sidedrawer';
import { registerElement } from "nativescript-angular/element-registry";
import { topmost } from 'tns-core-modules/ui/frame';
import { PracticeModal } from '../practiceModal/practiceModal.component';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { TNSPlayer } from 'nativescript-audio';
import { AudioCompleteModal } from './audio-complete-modal/audio-completed-modal.component';
import { GC } from "utils/utils";



@Component({
  moduleId: module.id,
  selector: "app-dashboard",
  templateUrl: './foundationAudio.component.html'
})
export class FoundationAudio implements OnDestroy {
  private itemData: any;
  private _player: TNSPlayer;
  onPlaying: any;
  public playerStatus = {
    playing: false,
    percentage: 0,
    duration: 0
  }



  constructor(
    page: Page, private modalDialogService: ModalDialogService, private viewContainerRef: ViewContainerRef,
    private ngZone: NgZone, private activeRouter: ActivatedRoute
  ) {
    page.actionBarHidden = true;
    this.itemData = JSON.parse(this.activeRouter.params['_value'].item);
    this._player = new TNSPlayer();
    this._player.debug = true;
    this.initPlayer();
  }


  ngOnDestroy() {

    this._player.pause();
    this._player.dispose();
    clearInterval(this.onPlaying);
  }

  initPlayer() {
     // set true to enable TNSPlayer console logs for debugging.
    this._player
      .initFromFile({
        audioFile: '~/audio/single.mp3', // ~ = app directory
        loop: false,
        completeCallback: this._trackComplete.bind(this),
        errorCallback: this._trackError.bind(this),
        infoCallback: (a) => {
          console.log('playing...', a)
        }

      })
      .then(() => {
        this._player.getAudioTrackDuration().then(duration => {
          // iOS: duration is in seconds
          // Android: duration is in milliseconds
          this.playerStatus.duration = parseInt(duration);
          console.log(`song duration:`, duration);
          this.togglePlay();
        });
      });
  }


  public togglePlay() {
    if (this._player.isAudioPlaying()) {
      this.playerStatus.playing = false;
      this._player.pause();
      clearInterval(this.onPlaying);
    } else {
      this._player.play();
      this.onPlaying = setInterval(this.onPlayingCallBack, 1000);
      this.playerStatus.playing = true;
    }
  }

  onPlayingCallBack = () => {
    // console.log("player dure : " + this._player.getAudioTrackDuration(), "---", "player current" + this._player.currentTime);
    this.setPlayerPercentage();
  }


  setPlayerPercentage = () => {
    let cur = 100 * this._player.currentTime / this.playerStatus.duration;
    this.playerStatus.percentage = Math.floor(cur);
    console.log("completed: ", this.playerStatus.percentage);
  }

  onSliderValueChange = (event) => {
    console.log('slider value:', event.value)
  }

  private _trackComplete(args: any) {
    console.log('reference back to player:', args.player);
    this.playerStatus.playing = false;
    this.playerStatus.percentage = 0;
    clearInterval(this.onPlaying);
    let options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      context: { data: 'something' }
    };
    this.openPracticeModal();
    // iOS only: flag indicating if completed succesfully
    console.log('whether song play completed successfully:', args.flag);
  }

  private _trackError(args: any) {
    console.log('reference back to player:', args.player);
    console.log('the error:', args.error);
    // Android only: extra detail on error
    console.log('extra info on the error:', args.extra);
    clearInterval(this.onPlaying);
  }

  openPracticeModal() {

    let options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      context: { data: 'something' }
    };

    this.modalDialogService.showModal(PracticeModal, options).then(() => {


      // console.log(ev)
    });
  }

  doGC(): void {
    GC();
  }


}
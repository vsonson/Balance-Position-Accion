import { Component, ViewChild, OnInit, AfterViewInit, ViewEncapsulation,ViewContainerRef  } from "@angular/core";
import { SegmentedBar, SegmentedBarItem } from "ui/segmented-bar";
import { Page } from "ui/page";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer, SideDrawerLocation } from 'nativescript-ui-sidedrawer';
import { HomeUI } from './../home-ui.service';
import { GC } from "utils/utils";

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.None,
    selector: "app-dashboard",
    templateUrl: 'practice.component.html',
    styleUrls: ['practice.component.scss']
})
export class PracticeComponent {
    public items: Array<SegmentedBarItem>;
    public prog: boolean = false;
    public sing: boolean = false;
    public audioProgram : any;
    public audioProgramObj: any = {};


    constructor(
                  page: Page, private modalDialogService: ModalDialogService,private viewContainerRef: ViewContainerRef,
                  private routerExtensions: RouterExtensions, private homeUi: HomeUI
                ) {
        page.actionBarHidden = true;
        homeUi.setAppBarTitle("");
        this.initAudioProgram();
      
    }


    close() {
    this.routerExtensions.navigate(["/drawerItems/help"]);

      }


    initAudioProgram() {
      this.audioProgram = this.getPrograms();
      this.audioProgramObj['episodes'] = this.audioProgram.program.singles_level_details.episodes;
      this.audioProgramObj['finished'] = this.audioProgram.program.last_covered_singles;
    }



  getPrograms() {
    return   {
                      streak: {
                        current_streak: 3,
                        all_time_streak: 4
                      },
                      program: {
                        total_singles: 4,
                        singles_streak: 3,
                        last_covered_singles: 2,
                        singles_level_details: {
                          level_no: 1,
                          episodes: [{
                              episode: 1,
                              type: "Single 1",
                              program_link: "~/audio/single.mp3",
                              length: "",
                              last_watched_length: "3.3"
                            },
                            {
                              episode: 2,
                              type: "Single 2",
                              program_link: "https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3",
                              length: "",
                              last_watched_length: "3.2"
                            },
                            {
                              episode: 3,
                              type: "Single 3",
                              program_link: "https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3",
                              length: "",
                              last_watched_length: "1.3"
                            },
                            {
                              episode: 3,
                              type: "Single 3",
                              program_link: "https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3",
                              length: "",
                              last_watched_length: "1.3"
                            },
                            {
                              episode: 3,
                              type: "Single 3",
                              program_link: "https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3",
                              length: "",
                              last_watched_length: "1.3"
                            },
                            {
                              episode: 3,
                              type: "Single 3",
                              program_link: "https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3",
                              length: "",
                              last_watched_length: "1.3"
                            },
                            {
                              episode: 3,
                              type: "Single 3",
                              program_link: "https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3",
                              length: "",
                              last_watched_length: "1.3"
                            },
                            {
                              episode: 3,
                              type: "Single 3",
                              program_link: "https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3",
                              length: "",
                              last_watched_length: "1.3"
                            },
                            {
                              episode: 4,
                              type: "Single 4",
                              program_link: "https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3",
                              length: "",
                              last_watched_length: "4.3"
                            }
                          ]
                        }
                      }
              }

  }

  

     public onSelectedIndexChange(args) {
        
        if (this.prog == false) {

          this.prog=true;
          this.sing=false;
          // code...
        } else if (this.sing == false) {

          this.prog=false;
          this.sing=true;
          // code...
        }
    }

    ngOnDestroy() {
      GC();
  }

    goToAudioPage(item: any) {

      this.routerExtensions.navigate(['/home/audio', {item: JSON.stringify(item)}]);
    }
   
}
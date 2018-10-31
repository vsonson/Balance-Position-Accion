import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef, ViewEncapsulation } from "@angular/core";
import { Page } from "ui/page";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer, SideDrawerLocation } from 'nativescript-ui-sidedrawer';
import * as TNSPhone from 'nativescript-phone';
import { GC } from "utils/utils";
import { Navigation } from './../../../common/services/common.service';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.None,
    selector: "app-dashboard",
    templateUrl: './resources.component.html',
    styleUrls: ['./resources.component.scss']

})
export class ResourcesComponent implements OnInit {

    constructor(
        page: Page,
        private router: RouterExtensions,
        private navigation: Navigation
    ) {
        page.actionBarHidden = true;
    }
    ngOnInit() {
    
    }

    ngOnDestroy() {
        GC();
      }


    call911() {
        TNSPhone.dial('911', true);
    }
    callSuicidePrevent() {
        TNSPhone.dial('1-800-273-8255', true);
    }
    callDomesticVoilence() {
        TNSPhone.dial('1-800-799-7233', true);
    }
    callTrevorLifeline() {
        TNSPhone.dial('1-866-488-7386', true);
    }



    messageHelp() {
        TNSPhone.sms(['741-741'], "NAMI")
            .then((args) => {
                console.log(JSON.stringify(args));
            }, (err) => {
                console.log('Error: ' + err);
            })
    }
    doGC(): void {
        GC();
    }

    goBack() {
        this.router.navigate(['/home/dashboard']);
      }
   

} 
import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef, ViewEncapsulation, ViewContainerRef } from "@angular/core";
import { Page } from "ui/page";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer, SideDrawerLocation } from 'nativescript-ui-sidedrawer';
import { Switch } from "ui/switch";
import { COMPOSITION_BUFFER_MODE } from "@angular/forms";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { NetworkModalComponent } from "./networkModal/networkModal.component";
import { NetworkService } from './network.service';
import { RouterExtensions } from 'nativescript-angular/router';
import { isIOS, isAndroid } from "platform";
import * as utils from "utils/utils";
  declare var UIView, NSMutableArray, NSIndexPath;
import { RadListView, ListViewEventData } from "nativescript-ui-listview";
import * as TNSPhone from 'nativescript-phone';
import { GC } from "utils/utils";



var view = require("ui/core/view");



class HomeNavItem {
    constructor(public id: number, public name: string, public color: string, public icon: string) {
        console.log(icon)
    }
}
class Item {
    constructor(public name: string, public phone_no: string, public profile_img: string) { }
}

let items = [{ id: '1', name: 'John Doe', image: 'http://abc.com/something.png', phone_no: '7411326328', alert: true, report: true },
{ id: '2', name: 'Mom', image: 'http://abc.com/something.png', phone_no: '7411326328', alert: false, report: true },
{ id: '2', name: 'Brother', image: 'http://abc.com/something.png', phone_no: '7411326328', alert: false, report: true }

];
//let items = [];

@Component({
    moduleId: module.id,
    selector: "network-tab",    
    templateUrl: 'network.component.html',
    styleUrls: ['./network.component.scss'],
    providers:[NetworkService]
   
})
export class NetworkComponent {
    public dataItems: any;
    greetMessage: string = "I am Child";
    collapseIndex: number = -1;
    lastCollapseIndex: number = -1;
    public firstSwitchState = "OFF";
    public secondSwitchState = "ON";
    public isVisible: boolean = false;
    public turnOff: boolean = false;
    public turnOffWellness: boolean = false;

    constructor(page: Page, private modalDialogService: ModalDialogService,
        private viewContainerRef: ViewContainerRef,
        private routerExtensions: RouterExtensions) {

        page.actionBarHidden = true;
        this.dataItems = items;
        this.firstSwitchState = "OFF";
        
    }
   


    templateSelector(item: any, index: number, items: any): string {
        // console.log("template selector", item, index )
        return item.expanded ? "expanded" : "default";
      }
      
    onItemTap(event: ListViewEventData) {
        // console.log("tap", event.index)
        // if(event.index == this.lastCollapseIndex) return;

        const listView = event.object,
        rowIndex = event.index,
        dataItem = event.view.bindingContext;
        // if(this.lastCollapseIndex != -1)
        //     this.dataItems[this.lastCollapseIndex]['expanded'] = false;

        dataItem['expanded'] = dataItem['expanded'] ? false : true;
        this.lastCollapseIndex = event.index;

        console.log(this.dataItems);
        if (isIOS) {
                var indexPaths = NSMutableArray.new();
                indexPaths.addObject(NSIndexPath.indexPathForRowInSection(rowIndex, event.groupIndex));
                listView.ios.reloadItemsAtIndexPaths(indexPaths);
        }
        if (isAndroid) {
            listView.androidListView.getAdapter().notifyItemChanged(rowIndex);
        }
    }

    showAccordion(args, index) {
        this.collapseIndex = index; 
    }
    public onFirstChecked(args,networkName) {
        let firstSwitch = <Switch>args.object;
        
        if (firstSwitch.checked) {
            this.firstSwitchState = "ON";
            
        } else {
            
            let options: ModalDialogOptions = {
                viewContainerRef: this.viewContainerRef,
                fullscreen: false,
                context: { data: 'myBalance',networkName:networkName }
            };

            this.modalDialogService.showModal(NetworkModalComponent, options).then(() => {
            });
            this.firstSwitchState = "OFF";
        }
        
    }

    public onSecondChecked(args,networkName) {
        let secondSwitch = <Switch>args.object;
        if (secondSwitch.checked) {
            
            this.secondSwitchState = "ON";
        } else {
            let options: ModalDialogOptions = {
                viewContainerRef: this.viewContainerRef,
                fullscreen: false,
                context: { data: 'myWellness' ,networkName:networkName}
            };

            this.modalDialogService.showModal(NetworkModalComponent, options).then(() => {
            });
            this.secondSwitchState = "OFF";
        }
    }
    openNetworkModal() {
        console.log("G");
        let options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: false,
            context: { data: 'addNetwork' }
        };

        this.modalDialogService.showModal(NetworkModalComponent, options).then((res) => {
          
            if(res && res.force)  return;
            
            let options: ModalDialogOptions = {
                viewContainerRef: this.viewContainerRef,
                fullscreen: false,
                context: { data: 'successMessage' }
            };
    
            this.modalDialogService.showModal(NetworkModalComponent, options).then(() => {
            });
            
        
        });


    }
    openRemoveModal(networkName){
        this.turnOffWellness=true;
        let options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: false,
            context: { data: 'removeNetwork' ,networkName:networkName}
        };

        this.modalDialogService.showModal(NetworkModalComponent, options).then(() => {
        });
    }

    goBack() {
        this.routerExtensions.back();
    }

    callNetwork(phoneNumber) {
        TNSPhone.dial(phoneNumber, true);
    }


 messageNetwork(phoneNumber) {
    TNSPhone.sms([phoneNumber], "Hi")
        .then((args) => {
            console.log(JSON.stringify(args));
        }, (err) => {
            console.log('Error: ' + err);
        })
}


  ngOnDestroy() {
    GC();
}
    
}

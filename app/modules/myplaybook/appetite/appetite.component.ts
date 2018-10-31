import { Component, ViewEncapsulation } from "@angular/core";
import { DataService, playBookData, PlayBookList } from "../data.service";
import { RouterExtensions } from "nativescript-angular";
import * as utils from "utils/utils";
import { GC } from "utils/utils";

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.None,
    selector: "app-appetite-playbook",
    templateUrl: './appetite.component.html'

})
export class AppetiteComponent {
    color: string;
    itemData: PlayBookList;
    type: string;
    user: any;
    constructor(private _dataService: DataService, private routerExtensions: RouterExtensions) {
        this.itemData = _dataService.getListItem("My Appetite");
        this.color = this.itemData.color;
        this.type = _dataService.getType();
        this.user = _dataService.getUserDetails();
    }

    goToFoundationProgram() {
        this.routerExtensions.navigate(["/home/foundation"]);
    }
    goToMindfulness() {
        this.routerExtensions.navigate(["/home/practice"]);
    }
    gotoResources()
    {
        this.routerExtensions.navigate(["/drawerItems/resources"]);
    }
    goToUrl(url) {
        console.log(url);
        utils.openUrl(url);
    }
   
}

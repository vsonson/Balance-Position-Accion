import { Component, ViewEncapsulation } from "@angular/core";
import { DataService, playBookData, PlayBookList } from "../data.service";
import { RouterExtensions } from "nativescript-angular";
import * as utils from "utils/utils";
import { GC } from "utils/utils";

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.None,
    selector: "app-body-playbook",
    templateUrl: './body.component.html'

})
export class BodyComponent  {
    color: string;
    itemData: PlayBookList;
    type: string;
    user: any;
    constructor(private _dataService: DataService,private routerExtensions: RouterExtensions)
    {
      this.itemData = _dataService.getListItem("My Body");
      this.color = this.itemData.color;
      this.type = _dataService.getType();
      this.user = _dataService.getUserDetails();
      console.log(this.type, "--->>>", this.color)
    }

    gotoNotebook()
    {
        this.routerExtensions.navigate(["/home/notebook"]);
    }
    gotoPractice()
    {
        console.log("practise")
        this.routerExtensions.navigate(["/home/practice"]);
    }
    gotoNetwork()
    {
        this.routerExtensions.navigate(["/home/network"]);
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

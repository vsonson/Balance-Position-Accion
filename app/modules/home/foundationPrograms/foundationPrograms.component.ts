import { Component ,OnInit } from "@angular/core";
import { Page } from "ui/page";
import { GC } from "utils/utils";


@Component({
    moduleId: module.id,
    selector: "app-dashboard",
    templateUrl: './foundationPrograms.component.html',

  styleUrls: ['./foundationPrograms.component.scss']
})
export class FoundationPrograms  {
public progressValue;
    constructor(
            page: Page
        ) {
        page.actionBarHidden = true;
        this.progressValue = 80;
    }
    onProgressLoaded(event) {
        event.object.color = "green";
        event.object.backgroundColor = "#FFF";
      }
    doGC(): void {
    GC();
  }

}
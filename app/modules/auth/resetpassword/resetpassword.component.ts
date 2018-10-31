import { Component, OnInit, OnDestroy } from '@angular/core';
import { Page } from "ui/page";
import { GC } from "utils/utils";

@Component({
  moduleId: module.id,
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit, OnDestroy {

  constructor(page: Page) {
    page.actionBarHidden = true;
  }

  ngOnInit() {
   
  }

  ngOnDestroy() {
    GC();
  }

}

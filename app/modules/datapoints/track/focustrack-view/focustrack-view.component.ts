import { Component, OnInit, OnDestroy } from '@angular/core';
import { GC } from "utils/utils";

@Component({
  moduleId: module.id,
  selector: 'app-focustrack-view',
  templateUrl: './focustrack-view.component.html',
  styleUrls: ['./focustrack-view.component.scss']
})
export class FocustrackViewComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    GC();
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { GC } from "utils/utils";

@Component({
  moduleId: module.id,
  selector: 'app-datapoints',
  templateUrl: './datapoints.component.html',
  styleUrls: ['./datapoints.component.css']
})
export class DatapointsComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
   
  }

  ngOnDestroy() {
    GC();
  }

}

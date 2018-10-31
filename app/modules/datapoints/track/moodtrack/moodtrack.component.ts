import { Component, OnInit, OnDestroy } from '@angular/core';
import { GC } from "utils/utils";

@Component({
  moduleId: module.id,
  selector: 'app-moodtrack',
  templateUrl: './moodtrack.component.html',
  styleUrls: ['./moodtrack.component.scss']
})
export class MoodtrackComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    GC();
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Page } from "ui/page";
import { RouterExtensions } from "nativescript-angular/router";
import { HomeUI } from './../home-ui.service';
import { GC } from "utils/utils";

@Component({
  moduleId: module.id,
  selector: 'app-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.css']
})

export class NoteBookComponent implements OnInit, OnDestroy {
  date: Date;
  exactDate: Date;
  disableNextDateBtn: boolean = true;
  notes: Notes = {
    general: [],
    track: [],
    practice: []
  };
  notebookItems: ListItems[] = [];
  selectedList = {
    category: '',
    index: -1
  };
  noteText: string;
  constructor(
    page: Page,
    private routerExtensions: RouterExtensions,
    private homeUi: HomeUI
  ) {
    page.actionBarHidden = true;
    // this.homeUi.setAppBarTitle("NoteBook")
  }

  ngOnInit() {
    
    this.initDate();
    this.initNotes();
  }

  ngOnDestroy() {
    GC();
  }
  doGC(): void {
    GC();
  }


  initNotes() {
   
    this.notes = {
      general: [
        { name: "General", type: "general", notes: "I will not sleep untill 12:00 clock because of exams.." }
      ],
      track: [
        { name: "Mood", type: "mood" },
        { name: "Sleep", type: "sleep" },
        { name: "Stress", type: "stress" },
        { name: "Injury", type: "injury" },
        { name: "Performance", type: "performance" },
        { name: "Body", type: "body" },
        { name: "Nutrition", type: "nutrition" },
        { name: "Focus", type: "focus" },
        { name: "Energy", type: "energy" },
        { name: "Interest", type: "interest" }
      ],
      practice: [
        { name: "Practice", type: "practice", notes: "I will not sleep untill 12:00 clock because of exams.." }
      ],
    }
  }


  selectList(category: string, index: number) {
    if (this.notes[category][index].notes)
      this.noteText = this.notes[category][index].notes;
    else
      this.noteText = "";
    this.selectedList = {
      category: category,
      index: index
    };
  }

  addNote(category: string, index: number) {
    this.notes[category][index].notes = this.noteText;
    // this.notebookItems[index].notes = this.noteText;
    this.selectedList = {
      category: '',
      index: -1
    };
  }

  initDate() {
    this.date = new Date();
    this.date.setHours(0);
    this.date.setMinutes(0);
    this.date.setSeconds(0);
    this.exactDate = new Date(this.date);
  }


  prevDate() {
    this.date.setDate(this.date.getDate() - 1);
    this.disableNextDateBtn = false;
  }

  nextDate() {
    if (this.disableNextDateBtn) return;
    this.date.setDate(this.date.getDate() + 1)
    if (this.compareExactDate(this.exactDate, this.date) == 0) {
      this.disableNextDateBtn = true;
    }
  }

  getDateFormatString(_date: Date) {
    return (_date.getMonth() + 1) + "/" + _date.getDate() + "/" + _date.getFullYear();
  }

  compareExactDate(a: Date, b: Date) {  //returns 1 if a is greater, returns 0 if both are equal, returns 2 if b is greater
    if (a.getFullYear() == b.getFullYear()) {
      if (a.getMonth() == b.getMonth())
        if (a.getDate() == b.getDate())
          return 0;
    }
    if (a.getFullYear() < b.getFullYear()) {
      return 1;
    }

    if (a.getMonth() < b.getMonth()) {
      return 1;
    }

    if (a.getDate() < b.getDate()) {
      return 1;
    }
    return 2;
  }



}

interface ListItems {
  name?: string;
  type?: string;
  notes?: string;
}

interface Notes {
  general?: ListItems[],
  track?: ListItems[],
  practice?: ListItems[]
}


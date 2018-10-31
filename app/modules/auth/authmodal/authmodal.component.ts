import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { ListPicker } from "ui/list-picker";
import { topmost } from "ui/frame";
import { SwipeGestureEventData } from "ui/gestures";
import * as dockModule from "tns-core-modules/ui/layouts/dock-layout";
import { FlexboxLayout } from 'ui/layouts/flexbox-layout';
import { AnimationCurve } from 'ui/enums';
import { AnimationDefinition, Animation } from 'ui/animation';
import { User } from "../../auth/shared/user/user";
import { UserService } from "../../auth/shared/user/user.service"
import { Http } from '@angular/http';
import { Headers, Response } from "@angular/http";
import { GC } from "utils/utils";
let http = require("tns-core-modules/http");


let view: FlexboxLayout;



var enums = require("ui/enums");


let sportList = ["N/A", "Baseball", "Softball", "Basketball"];
let educationList = ["N/A", "High school", "College", "Graduate"];
let yearList = ["N/A", "1990", "1991", "1992"];
let genderList = ["N/A", "Male", "Female", "Non-binary"];
let countryList = ["N/A", "USA", "Paraguay", "Uruguay"];
let stateList = ["N/A", "PA", "DE"];
let slides = [1, 2, 3];
let isClassVisible = false;




@Component({
  moduleId: module.id,
  selector: 'app-modal',
  templateUrl: './authmodal.component.html',
  providers: [UserService],
  styleUrls: ['./authmodal.component.scss']
})
export class AuthModalComponent implements OnInit, OnDestroy {
  public sportList: Array<string>;
  public educationList: Array<string>;
  public yearList: Array<string>;
  public genderList: Array<string>;
  public countryList: Array<string>;
  public stateList: Array<string>;
  public picked: string;
  public slide: any = 0;
  public slide2: boolean = false;
  public slide3: boolean = false;
  public selectedIndex = 0;
  public direction: number;
  public SWIPE_ACTION: any = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  public swipeDirection = 2;
  public userInfoJson: Array<any>;
  user: User;


  constructor(private userService: UserService, private http: Http, private modalDialogParams: ModalDialogParams) {

    this.user = new User();
    let params = this.modalDialogParams.context;
    this.sportList = [];
    this.educationList = [];
    this.yearList = [];
    this.genderList = [];
    this.countryList = [];
    this.stateList = [];
    this.userInfoJson = [];
    
    for (let i = 0; i < sportList.length; i++) {
      this.sportList.push(sportList[i]);
    }
    for (let i = 0; i < educationList.length; i++) {
      this.educationList.push(educationList[i]);
    }
    for (let i = 0; i < yearList.length; i++) {
      this.yearList.push(yearList[i]);
    }
    for (let i = 0; i < genderList.length; i++) {
      this.genderList.push(genderList[i]);
    }
    for (let i = 0; i < countryList.length; i++) {
      this.countryList.push(countryList[i]);
    }
    for (let i = 0; i < stateList.length; i++) {
      this.stateList.push(stateList[i]);
    }
  }
  close() {
    this.modalDialogParams.closeCallback();
  }
  public selectedIndexChanged(args, userInfoparam) {
    let picker = <ListPicker>args.object;
    console.log(args.object);


    this.picked = this.sportList[picker.selectedIndex];
    this.selectedIndex = picker.selectedIndex;
    if (userInfoparam == '1') {
      this.user.primarySport = this.sportList[this.selectedIndex];


    } else if (userInfoparam == '2') {
      this.user.educationLevel = this.educationList[this.selectedIndex];


    } else if (userInfoparam == '3') {
      this.user.yearOfBirth = this.yearList[this.selectedIndex];


    }
    else if (userInfoparam == '4') {
      this.user.gender = this.genderList[this.selectedIndex];


    }
    else if (userInfoparam == '5') {
      this.user.country = this.countryList[this.selectedIndex];


    }
    else if (userInfoparam == '6') {
      this.user.state = this.stateList[this.selectedIndex];
    }
    console.log(JSON.stringify(this.user));
  }
  onTap() {


  }
  onSwipe(args: SwipeGestureEventData, currentIndex) {
    this.swipeDirection = args.direction;
    let isClassVisible = true;
    let nextIndex = 0;
    let grid = <FlexboxLayout>args.object;
    let slideAnim = 'slide' + currentIndex + 2;
    if ((args.direction === 1) && (currentIndex != 0)) {
      nextIndex = currentIndex - 1;
    } else if ((args.direction === 2) && (currentIndex < 2)) {
      nextIndex = currentIndex + 1;
    } else if (currentIndex == 2) {
      nextIndex = 2;
    }
    else if (currentIndex == 0) {
      nextIndex = 0;
    }
    this.slide = nextIndex;


  }

  storeUserInfo() {
    console.log(JSON.stringify(this.user));
    this.userService.userInfo(this.user).subscribe(
      (data) => {
        console.log(data + "api resp");
      }
    );
  }

  ngOnInit() {
   
  }
 
  ngOnDestroy() {
    GC();
  }

}
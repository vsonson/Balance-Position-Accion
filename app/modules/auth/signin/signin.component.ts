import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { Headers, Response } from "@angular/http";
import { User } from "../shared/user/user";
import { UserService } from "../shared/user/user.service"
import { Page } from "ui/page";
import { RouterExtensions } from "nativescript-angular/router";
import { UserToken } from '../shared/user/usertoken';
import { loginInputValidations } from '../../../common/constants/messages';
import { AlertService, SharedService } from '../../../common/services/services-index';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { ModalComponent } from "../../drawer-items/modal/modal.component";
import { Loader } from '../../../common/components/loader/loader.service';
import { GC } from "utils/utils";
let http = require("tns-core-modules/http");

@Component({
  moduleId: module.id,
  selector: 'app-signin',
  providers: [UserService, SharedService, AlertService],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {
  user: User;
  errorMessage: any = loginInputValidations;
  isLoading: boolean;
  invalidError: boolean;

  constructor(private userService: UserService,
    private alertService: AlertService,
    page: Page,
    private routerExtensions: RouterExtensions,
    private sharedService: SharedService,
    private modalDialogService: ModalDialogService,
    private viewContainerRef: ViewContainerRef, private loader: Loader) {
    this.user = new User();

    page.actionBarHidden = true;
    if (this.sharedService.getAuthHeader()) this.routerExtensions.navigate(['home/dashboard']) //navigate to home if already signed in

  }

  ngOnInit() {
  
  }

  ngOnDestroy() {
    GC();
  }

  login() {
    this.invalidError = false;
    if (this.user.username && this.user.password && this.user.isValidEmail()) {
      this.isLoading = true;
      this.userService.login(this.user).subscribe((data) => {
        // store token inside localstorage
        this.sharedService.setToken(data);

        console.log('success', JSON.stringify(data))
        this.isLoading = false;

        this.routerExtensions.navigate(["/auth/quote"]);

      }, (error) => {
        this.isLoading = false;
        if(error.status == 401) {
          this.invalidError = true;
        }
        console.log('Err', JSON.stringify(error))
        this.alertService.error(this.errorMessage.badCredentials, true);
      });
    }
    else {  
      return false;
    }
  }


  openModal() {
    let options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      context: { data: 'something' }
    };

    this.modalDialogService.showModal(ModalComponent, options).then(() => {

    });
  }




}

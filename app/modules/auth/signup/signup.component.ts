import { Component, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Page } from "ui/page";
let http = require("tns-core-modules/http");
import { User } from "../shared/user/user";
import { UserService } from "../shared/user/user.service"
import { Http } from '@angular/http';
import { signupInputValidations, constants } from '../../../common/constants/messages';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { ModalComponent } from "../../drawer-items/modal/modal.component";
import { AlertService, SharedService } from '../../../common/services/services-index';
import { AuthModalComponent } from "../authmodal/authmodal.component";
require("nativescript-localstorage");
import { confirm } from "ui/dialogs";
import { Router } from '@angular/router';
import { Loader } from '../../../common/components/loader/loader.service';
import { GC } from "utils/utils";
@Component({
  moduleId: module.id,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  providers: [UserService, AlertService, SharedService],
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  user: User;
  errorMessage: any = signupInputValidations;
  constantsMessage: any = constants;
  isLoading: boolean;

  errorStatus: any = {
    name: false,
    validEmailId: false,
    email: false,
    password: false,
    confirmPass: false,
    passNotmatch: false

  }
  isPassMatch: boolean = true;
  constructor(
    private userService: UserService,
    private http: Http,
    page: Page,
    private modalDialogService: ModalDialogService,
    private viewContainerRef: ViewContainerRef,
    private alertService: AlertService,
    private sharedService: SharedService,
    private router: Router,
    private loader: Loader) {
    this.user = new User();
    page.actionBarHidden = true;

  }

  ngOnInit() {
  
  }

  ngOnDestroy() {
    GC();
  }

  signup() {
    this.errorStatus.name = this.user.name ? false : true;
    this.errorStatus.email = this.user.username ? false : true;
    this.errorStatus.pass = this.user.password ? false : true;
    this.errorStatus.confirmPass = this.user.repeatPassword ? false : true;
    this.errorStatus.passNotmatch = (this.user.password && this.user.repeatPassword && this.user.isPasswordMatch()) ? false : true;
    this.errorStatus.validEmailId = (this.user.password && this.user.isValidEmail()) ? false : true;


    if (this.user.name
      && this.user.username
      && this.user.password
      && this.user.repeatPassword
      && this.user.isValidEmail()
      && this.user.isPasswordMatch()) {
      this.isLoading = true;
      this.userService.signup(this.user).subscribe((data) => {
        this.sharedService.setUserInfo(this.user);
        this.isLoading = false;
        this.redirectSignIn();
      }, err => {
        this.isLoading = false;
        this.alertService.error(this.errorMessage.badResponse, true);
      });
    }
  }

  openModal() {
    let options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      context: { data: 'SignUP' }
    };

    this.modalDialogService.showModal(ModalComponent, options).then(() => {

    });
  }

  redirectSignIn() {

    let signupOption = {
      title: this.constantsMessage.signupSuccess,
      message: this.constantsMessage.emailSent,
      okButtonText: this.constantsMessage.navigateSignIn
    };

    confirm(signupOption).then((result: boolean) => {
      this.router.navigate(["/auth/signin"]);
    });

  }

 

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Page } from "ui/page";
import { User } from "../shared/user/user";
import { changePasswordInputValidations, constants } from '../../../common/constants/messages';
import { UserService } from "../shared/user/user.service"
import { Http } from '@angular/http';
import { Loader } from '../../../common/components/loader/loader.service';
import { GC } from "utils/utils";
@Component({
  moduleId: module.id,
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})

export class ChangepasswordComponent implements OnInit, OnDestroy {
  user: User;
  public repeatPassword: string;
  public newPassword: string;
  errorMessage: any = changePasswordInputValidations;
  errorStatus: any = {
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
    passNotmatch: false
  }
  constructor(page: Page, private userService: UserService, private loader: Loader) {
    this.user = new User();
    page.actionBarHidden = true;
  }

  ngOnInit() {
  
  }

  ngOnDestroy() {
    GC();
  }

  changePassword() {
    console.log('changePassword calling');
    this.errorStatus.oldPassword = this.user.oldPassword ? false : true;
    this.errorStatus.newPassword = this.user.password ? false : true;
    this.errorStatus.confirmNewPassword = this.user.repeatPassword ? false : true;
    this.errorStatus.passNotmatch = (this.user.password && this.user.repeatPassword && this.user.isPasswordMatch()) ? false : true;

    console.log(JSON.stringify(this.user));

    if (this.user.oldPassword
      && this.user.password
      && this.user.repeatPassword
      && this.user.isPasswordMatch()) {
      console.log('Proccessing', this.user.password);

      this.apiCall();

    }
  }

  apiCall() {
    console.log("API");
    this.userService.changePassword(this.user.password).subscribe((data) => {
      console.log(data);
      console.log("password changed");
      alert("Password Changed.");
    },
      (err) => {
        alert("Error changing password")
      }
    );
  }
  

}

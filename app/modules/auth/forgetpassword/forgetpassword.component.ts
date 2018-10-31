import { Component, OnInit, OnDestroy } from '@angular/core';
import { Page } from "ui/page";
let http = require("tns-core-modules/http");
import { User } from "../shared/user/user";
import { UserService } from "../shared/user/user.service"
import { Http } from '@angular/http';
import { Loader } from '../../../common/components/loader/loader.service';
import { GC } from "utils/utils";
@Component({
  moduleId: module.id,
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  providers: [UserService],
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit, OnDestroy {
  emailRequired: boolean;
  user: User;
  public re: any
  emailId: string;

  emailInvalid: string;
  emailInvalidStatus: boolean;
  constructor(private userService: UserService, page: Page, private loader: Loader) {
    this.user = new User();
    this.re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    page.actionBarHidden = true;
  }

  ngOnInit() {
  
  }

  ngOnDestroy() {
    GC();
  }
  // isValidEmail() {
  //   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return re.test(this.username);
  // }

  sendlink() {
    this.emailInvalid = 'Please enter your valid email address';
    this.emailInvalidStatus = false;

    if (!this.re.test(this.emailId)) {
      // alert("Enter a valid email address.");
      this.emailInvalidStatus = true;
      this.emailRequired = false;
    }
    else {
      console.log("success");
      this.loader.show("Loading...");
      this.userService.requestPasswordReset(this.emailId).subscribe(
        (data) => {
          console.log(data);
          console.log("api successfull email sent");
          this.emailInvalidStatus = false;
          this.loader.hide();
          alert("email has been sent, Kindly check your email inbox");
        },
        (err) => {
          this.emailInvalidStatus = false;
          console.log(err);
          this.loader.hide();
          alert("Email address not registered")
        }
      );
    }

  }
 

}

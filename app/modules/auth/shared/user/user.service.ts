import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { SharedService } from '../../../../common/services/services-index';
import { apiUrls  } from '../../../../common/constants/api-urls';

import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { User } from "./user";
//import { Config } from "../config";

@Injectable()
export class UserService {
  constructor(private http: Http, private sharedService: SharedService ) {
    this.reqOptions = new RequestOptions({ headers: this.headers });
  }
  
  API_URL: string = this.sharedService.getAPIUrl();
  authHeader: any = this.sharedService.getAuthHeader();

  private headers = new Headers({ 
      "Content-Type": "application/json"
    });
  private reqOptions:RequestOptions;

  login(user: User) {
    return this.http.post(this.API_URL + "/authenticate",
      JSON.stringify({
        username: user.username,
        password: user.password,
        rememberMe : true
      }), this.reqOptions
    )
    .map((res: Response) => res.json());
  }
  

  signup(user: User) {
    return this.http.post(this.API_URL + "/register",
      JSON.stringify({
        email: user.username,
        password: user.password,
        login : user.username,
        langKey: "en"
      }),
      { headers: this.getCommonHeaders() }
    )
    .catch(this.handleErrors);
  }

  requestPasswordReset(email:string) {
    return this.http.post(apiUrls.host + apiUrls.urls.forgotPassword.requestPasswordReset, email);
  }
  changePassword(password:string) {
    return this.http.post("https://balancepositiondemo.com/api/account/change_password", password);
  }

  userInfo(user: User) {
  //var appSettings = require("application-settings");
  //var value = appSettings.getString(user.username, "No string value");
  //console.log("user-info" +value);
    return this.http.put("https://balancepositiondemo.com/api/user-infos",
      JSON.stringify({

        primarySport:user.primarySport,
        educationLevel:user.educationLevel,
        dateOfBirth:user.dateOfBirth,
        gender:user.gender,
        country:user.country,
        state:user.state,
        phone: user.phone,
        langKey: "en"
      }),
      this.sharedService.getAuthHeader()
    )
    .catch(this.handleErrors);
  }


  getUserInfo(userId:number) {
    return this.http.get(this.API_URL+"/user-infos/"+userId,  this.sharedService.getAuthHeader())
    .map((res: Response) => res.json())
    .catch(this.handleErrors);
  }
  
  getCommonHeaders() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return headers;
  }

  getAuthHeaders() {
    console.log(this.sharedService.getToken());
    let headers = new Headers({
    "Content-Type": "application/json",
    "Accept": "text/plain",
    "Authorization": "Bearer "+this.sharedService.getToken()
    });
    return new RequestOptions({ headers: headers });
  }

  handleErrors(error: Response) {
    return Observable.throw(error);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrls  } from './../../common/constants/api-urls';
import { SharedService } from './../../common/services/shared.service';

@Injectable()
export class DrawerHttpService {
	private headers: any;
	constructor(
					private http: HttpClient,
					private sharedService: SharedService
		) { 
				this.headers = sharedService.getHttpHeaders();
		}

	
updateUserInfo(phone:string,primarySport:string,country:string,state:string,gender:string,dateOfBirth:string,educationLevel:string)
{
	let data = {
			phone,primarySport,country,state,gender,dateOfBirth,educationLevel
		};

		console.log("url : ",  apiUrls.host + apiUrls.urls.userInfoResourcePut.updateUserInfo, JSON.stringify(data), this.headers);
		
	return this.http.post(apiUrls.host + apiUrls.urls.userInfoResourcePut.updateUserInfo, data,  this.headers);
}

getAllUserInfos()
{
	return this.http.get("https://balancepositiondemo.com/api/user-infos/?size=100000", this.headers);
}

getUserData(userId) {
    return this.http.get("https://balancepositiondemo.com/api/user-infos/" +userId ,  this.headers);
    

}
getUserName()
{
	return this.http.get("https://balancepositiondemo.com/api/users",this.headers);
}
updateUserName(firstName:string)
{
	return this.http.post("https://balancepositiondemo.com/api/users", firstName,  this.headers);
}
}








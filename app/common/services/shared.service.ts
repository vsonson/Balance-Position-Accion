import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
require( "nativescript-localstorage" );

@Injectable()
export class SharedService {

	constructor(private http: Http) { }

	setToken(data: any) {
		if(data) {
			localStorage.setItem("currentUser", JSON.stringify(data));
		}
	}

	getToken() {
		let token = JSON.parse(localStorage.getItem('currentUser'));
		if(token) {
			return token.id_token;
		}
	}

	setUserInfo(userObj) {
		localStorage.setItem("signedUpUser", JSON.stringify(userObj));
	}

	getUserInfo(userObj) {
		//localStorage.setItem("signedUpUser", JSON.stringify(userObj));
		return JSON.parse(localStorage.getItem('signedUpUser'));
	}


	removeToken() {
		localStorage.removeItem('currentUser');
	}

	// to get api url based on Env.  
	getAPIUrl(): string{
		return "https://balancepositiondemo.com/api";
	}

	getAuthHeader() {
		// Modify request header and add token 
		if(!localStorage.getItem('currentUser')) return null;
		let token = this.getToken();
		let headers = new Headers({ 
			"Content-Type": "application/json",
			'Authorization': 'Bearer ' + token
		});
		return new RequestOptions({ headers: headers });
	}

	getHttpHeaders() {
		if(!localStorage.getItem('currentUser')) return null;
		let token = this.getToken();
		let httpOptions = {
		  headers: new HttpHeaders({
		    'Content-Type':  'application/json',
		    'Authorization': 'Bearer ' + token
		  })
		};

		return httpOptions;

	}
}



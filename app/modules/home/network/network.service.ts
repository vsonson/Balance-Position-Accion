import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
require( "nativescript-localstorage" );

@Injectable()
export class NetworkService {

	constructor(private http: Http) { }

}



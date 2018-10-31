
import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { SharedService } from '../../common/services/services-index';

import { Track } from "./track-model";

@Injectable()
export class TrackService {

	constructor(private http: Http, private sharedService: SharedService) {
		

	}
	API_URL: string = this.sharedService.getAPIUrl();
	authHeader: any = this.sharedService.getAuthHeader();


	postTrack(track: Track, trackType) {
		return this.http.post(this.API_URL + "/"+ trackType,
		  JSON.stringify({
			value: track.value,
			timestamp: track.timestamp
		  }), this.sharedService.getAuthHeader()
		)
		.map((res: Response) => res.json())
		.catch(this.handleErrors);
	}


	handleErrors(error: Response) {
		return Observable.throw(error);
	}


	compareExactDate(a:Date, b:Date) {  //returns 1 if a is greater, returns 0 if both are equal, returns 2 if b is greater
		if(a.getFullYear() == b.getFullYear()) {
			if(a.getMonth() == b.getMonth())
				if(a.getDate() == b.getDate())
					return 0;
		}
	    if(a.getFullYear() < b.getFullYear()) {
	        return 1;
	    }
	    
	    if(a.getMonth() < b.getMonth()) {
	        return 1;
	    }
	    
	    if(a.getDate() < b.getDate()) {
	        return 1;
	    } 
	    return 2;
	    
	}


}
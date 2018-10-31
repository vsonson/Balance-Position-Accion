import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrls  } from './../../common/constants/api-urls';
import { SharedService } from './../../common/services/shared.service';

@Injectable()
export class DataPointsHttpService {
	private headers: any;
	constructor(
					private http: HttpClient,
					private sharedService: SharedService
		) { 
				this.headers = sharedService.getHttpHeaders();
		}

	

	getAllMetricData(dataPointName, multiData?:string[]) {
		let dateToday = new Date();
		let today=new Date().toISOString();
		let dateSpanMed = dateToday.setDate(dateToday.getDate()-7);
		let dateSpan = new Date(dateSpanMed).toISOString();
		// let dateToday = "2018-07-23T12:49:34.985Z";
		// let dateSpan = "2018-07-08T12:49:34.985Z";
		let dataPointNameQuery = "dataPointName.equals=" + dataPointName + '&';
		if(multiData) {
			dataPointNameQuery = "dataPointName.in=" + multiData[0] + "&" + "dataPointName.in=" + multiData[1] + "&";
		}

		let postQuery = "?" + dataPointNameQuery + 'frontendViewModel=true&timestamp.greaterThan='+dateSpan+'&timestamp.lessOrEqualThan='+today + "&frontendViewModel=true";
		console.log(apiUrls.host + apiUrls.urls.metricDatumResource.getAllMetricData+postQuery);

		return this.http.get(apiUrls.host + apiUrls.urls.metricDatumResource.getAllMetricData+postQuery, this.headers);
	}
	


}
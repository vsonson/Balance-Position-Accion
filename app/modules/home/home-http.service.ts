import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrls } from './../../common/constants/api-urls';
import { SharedService } from './../../common/services/shared.service';

@Injectable()
export class HomeHttpService {
	private headers: any;
	constructor(
		private http: HttpClient,
		private sharedService: SharedService
	) {
		this.headers = sharedService.getHttpHeaders();
	}

	createUserDataPoint(color: string, dataPointName: string, enabled: boolean) {
		let data = {
			color, dataPointName, enabled
		};

		console.log("url : ", apiUrls.host + apiUrls.urls.dataPointResource.createUserDataPoint, JSON.stringify(data), JSON.stringify(this.headers.headers));
		return this.http.post(apiUrls.host + apiUrls.urls.dataPointResource.createUserDataPoint, data, this.headers);
	}

	getAllDataPoints(staleCode) {

		return this.http.get(apiUrls.host + apiUrls.urls.dataPointResourceGet.getAllDataPoints + '?ignoreStale=' + staleCode, this.headers);
	}




}
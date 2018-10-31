import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrls } from './../../common/constants/api-urls';
import { SharedService } from './../../common/services/shared.service';

@Injectable()
export class MyPlayBookService {
	private headers: any;
	constructor(
		private http: HttpClient,
		private sharedService: SharedService
	) {
		this.headers = sharedService.getHttpHeaders();
	}

	getAllDataPoints(staleCode) {
		return this.http.get(apiUrls.host + apiUrls.urls.dataPointResourceGet.getAllDataPoints + '?ignoreStale=' + staleCode, this.headers);
	}
}
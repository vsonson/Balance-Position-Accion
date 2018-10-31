import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrls  } from './../../common/constants/api-urls';
import { SharedService } from './../../common/services/shared.service';

@Injectable()
export class TrackHttpService {
	private headers: any;
	date:Date;
	constructor(
					private http: HttpClient,
					private sharedService: SharedService
		) { 
				this.headers = sharedService.getHttpHeaders();
		}
		

	createMetricDatum(dataPointName: string,datumValue:string, timestamp: string) {
		let data = {
			dataPointName,datumValue,timestamp
		};

		console.log("url : ",  apiUrls.host + apiUrls.urls.focusDatumResource.createMetricDatum, JSON.stringify(data), JSON.stringify(this.headers.headers));
		return this.http.post(apiUrls.host + apiUrls.urls.focusDatumResource.createMetricDatum, data, this.headers);
	}



createPerformanceDatum(dataPointName: string,datumValue:string, timestamp: string) {
		let data = {
			dataPointName,datumValue,timestamp
		};

		console.log("url : ",  apiUrls.host + apiUrls.urls.performanceDatumResource.createPerformanceDatum, JSON.stringify(data), JSON.stringify(this.headers.headers));
		return this.http.post(apiUrls.host + apiUrls.urls.performanceDatumResource.createPerformanceDatum, data, this.headers);
	}




	createInjuryDatum(dataPointName: string,datumValue:string, timestamp: string) {
		let data = {
			dataPointName,datumValue,timestamp
		};

		console.log("url : ",  apiUrls.host + apiUrls.urls.injuryDatumResource.createInjuryDatum, JSON.stringify(data), JSON.stringify(this.headers.headers));
		return this.http.post(apiUrls.host + apiUrls.urls.injuryDatumResource.createInjuryDatum, data, this.headers);
	}

createInterestDatum(dataPointName: string,datumValue:string, timestamp: string) {
		let data = {
			dataPointName,datumValue,timestamp
		};

		console.log("url : ",  apiUrls.host + apiUrls.urls.interestDatumResource.createInterestDatum, JSON.stringify(data), JSON.stringify(this.headers.headers));
		return this.http.post(apiUrls.host + apiUrls.urls.interestDatumResource.createInterestDatum, data, this.headers);
	}

	createAppetiteDatum(dataPointName: string,datumValue:string, timestamp: string) {
		let data = {
			dataPointName,datumValue,timestamp
		};

		console.log("url : ",  apiUrls.host + apiUrls.urls.appetiteDatumResource.createAppetiteDatum, JSON.stringify(data), JSON.stringify(this.headers.headers));
		return this.http.post(apiUrls.host + apiUrls.urls.appetiteDatumResource.createAppetiteDatum, data, this.headers);
	}


createEnergyDatum(dataPointName: string,datumValue:string, timestamp: string) {
		let data = {
			dataPointName,datumValue,timestamp

		};
console.log("energy test",data);
		console.log("url : ",  apiUrls.host + apiUrls.urls.energyDatumResource.createEnergyDatum, JSON.stringify(data), JSON.stringify(this.headers.headers));
		return this.http.post(apiUrls.host + apiUrls.urls.energyDatumResource.createEnergyDatum, data, this.headers);
	}



	createMoodDatum(dataPointName: string,datumValue:string, timestamp: string) {
		let data = {
			dataPointName,datumValue,timestamp
		}
		return this.http.post(apiUrls.host + apiUrls.urls.moodDatumResource.createMoodDatum, data, this.headers);

	}

	createSleepDatum(dataPointName:string, datumValue:string, durationHours:number,  timestamp: string) {
		let data = {
			dataPointName,datumValue,durationHours, timestamp
		}
		return this.http.post(apiUrls.host + apiUrls.urls.sleepDatumResource.createSleepDatum, data, this.headers);

	}
	createStressDatum(dataPointName: string,datumValue: string,timestamp: string) {
		let data = {
			dataPointName,datumValue, timestamp
		}
		return this.http.post(apiUrls.host + apiUrls.urls.stressDatumResource.createStressDatum, data, this.headers);

	}
	createBodyDatum(dataPointName: string,datumValue: string, headache: string,timestamp: string) {
		let data = {
			 dataPointName,datumValue,headache,timestamp
		}
	console.log("test",JSON.stringify(data),headache,datumValue);

		return this.http.post(apiUrls.host + apiUrls.urls.bodyDatumResource.createBodyDatum, data, this.headers);

	}



	getTodayTrack(name: string,timestamp :string) {
		// S
		// let today:Date;
		// today = new Date();
		
        // today.setHours(0, 0, 0, 0);
		
		
		// console.log("today:",today.toISOString())
		return this.http.get(apiUrls.host + "api/metric-data?dataPointName.equals=" + name + "&dataPointName.specified=true&timestamp.greaterOrEqualThan=" + timestamp + "&frontendViewModel=true", this.headers)
	}

	


}
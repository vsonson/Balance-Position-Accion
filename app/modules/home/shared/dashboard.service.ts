import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { SharedService } from './../../../common/services/services-index';
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

@Injectable()
export class DashboardService {
  constructor(private http: Http, private sharedService: SharedService) {
    this.reqOptions = new RequestOptions({ headers: this.headers });
  }

  authHeader: any = this.sharedService.getAuthHeader();
  API_URL: string = this.sharedService.getAPIUrl();

  private headers = new Headers({
    "Content-Type": "application/json"
  });
  private reqOptions: RequestOptions;

  dataPoint(staleCode) {
    return this.http.get(this.API_URL + "/data-points?ignoreStale=" + staleCode, this.sharedService.getAuthHeader())
      .map((res: Response) => res.json())
      .catch(this.handleErrors);
  }

  quoteOfTheDay() {
    console.log("Service Hi quote");
    return this.http.get(this.API_URL + "/quote-of-the-days/current", this.authHeader)
      .map((res: Response) => res.json())
      .catch(this.handleErrors);
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }

}
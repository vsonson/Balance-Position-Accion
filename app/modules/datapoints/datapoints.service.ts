import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrls  } from './../../common/constants/api-urls';

@Injectable()
export class DataPointsService {
      constructor(private http: HttpClient) { 
          console.log(apiUrls);
      }


}
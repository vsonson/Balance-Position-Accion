import { Injectable } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { Loader } from './../components/loader/loader.service';

@Injectable()
export class Navigation {
  constructor(private router:RouterExtensions, private loader: Loader) {}

  navigate(link: any) {
    this.loader.show('Loading');
    this.router.navigate(link);
  }

  back() {
    this.router.back();
  }
  
}

@Injectable()
export class Utility {
  constructor() {}

  getDays(shorthand?: boolean) {
    let days: string[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let daysShort: string[] = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    if(shorthand) return daysShort;
    return days;
  }

  getDayNameInWeek(timestamp: string, shorthand?: boolean) {
  	let index: number = new Date(timestamp).getDay();
  	let days: string[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  	if(shorthand) {
  		return days[index].substr(0,3);
  	} else {
  		return days[index]
  	}
  }

  orderDays(arr) {
    let finalArr = [];
    let fromIndex = new Date().getDay();
    for(var i=fromIndex+1;i<arr.length;i++) {
        finalArr.push(arr[i]);
    }
    
    for(var i=0;i<=fromIndex;i++) {
        finalArr.push(arr[i]);
    }
    return finalArr;
 }


  formatGraphArray(array, valueField, shorthand?: boolean) {
      let days = this.getDays(shorthand);
      let result = [];
      
      for(let i=0;i<days.length;i++) {
          let d = {};
          d["Day"] = days[i];
          d[valueField] = 0;
          result.push(d);
      }
      
      for(let i=0;i<array.length;i++) {
          let index = days.indexOf(array[i].Day);
          result[index] = array[i];
      }
      
      result = this.orderDays(result);
      return result;
  }

  seperateDataPoints(dataPoint1: string, dataPoint2: string, array: any[]) {
    let result = {};
    result[dataPoint1] = [];
    result[dataPoint2] = [];
    array.forEach((item) => {
      if(item['dataPointName'] == dataPoint1) result[dataPoint1].push(item);
      if(item['dataPointName'] == dataPoint2) result[dataPoint2].push(item);
    });
    return result;
  }
  
}

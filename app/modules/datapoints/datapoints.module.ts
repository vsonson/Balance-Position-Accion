import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedService } from './../../common/services/shared.service';

import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptRouterModule } from 'nativescript-angular';
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { DatapointsRoutes } from './datapoints.routes';
import { DatapointsComponent } from './datapoints/datapoints.component';
import { DataPointsService } from './datapoints.service';
import { MoodComponent } from './mood/mood.component'
import { SleepComponent } from './sleep/sleep.component'
import { StressComponent } from './stress/stress.component'
import { PerformanceComponent } from './performance/performance.component'
import { EnergyComponent } from './energy/energy.component'
import { NutritionComponent } from './nutrition/nutrition.component'
import { FocusComponent } from './focus/focus.component'
import { InterestComponent } from './interest/interest.component'
import { InjuryComponent } from './injury/injury.component'
import { BodyComponent } from './body/body.component';
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";
import { InfoComponent } from "./info/info.component"
import { HomeModule } from './../home/home.module';
import { MoodtrackComponent } from './track/moodtrack/moodtrack.component';
import { MoodtrackViewComponent } from './track/moodtrack-view/moodtrack-view.component';
import { FocustrackViewComponent } from './track/focustrack-view/focustrack-view.component';
import { PerformancetrackViewComponent } from './track/performancetrack-view/performancetrack-view.component';
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { HttpClientInterceptor } from '../../common/services/interceptor.service';
import { DataPointsHttpService } from './datapoints-http.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({

 
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule.forChild(<any>DatapointsRoutes),
    NativeScriptUIChartModule,
    NativeScriptHttpClientModule,
    NativeScriptUIListViewModule,
    [HomeModule]
  ],
  declarations: [
    DatapointsComponent,
    MoodComponent,
    SleepComponent,
    StressComponent,
    PerformanceComponent,
    EnergyComponent,
    NutritionComponent,
    FocusComponent,
    InterestComponent,
    InjuryComponent,
    BodyComponent,
    InfoComponent,
    MoodtrackComponent,
    MoodtrackViewComponent,
    PerformancetrackViewComponent,
    FocustrackViewComponent
  ],
  providers: [DataPointsService, DataPointsHttpService, SharedService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true }],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class DatapointsModule { }

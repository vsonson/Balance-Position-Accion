import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { FormsModule } from '@angular/forms';
import {NativeScriptFormsModule} from "nativescript-angular/forms"
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { routes, declareComponents } from './track.routing';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

import { TrackService } from './track.service';
import { TrackHttpService } from './track-http.service';
import { HomeModule } from "../home/home.module";
import { SharedService } from "../../common/services/shared.service";
import { HttpClientInterceptor } from '../../common/services/interceptor.service';



@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
    entryComponents:[],
    imports: [
        NativeScriptRouterModule,
        NativeScriptRouterModule.forChild(routes),
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        FormsModule,
        HomeModule,
        NativeScriptHttpClientModule,
        TNSFontIconModule.forRoot({
            'fa': './fonts/font-awesome.css',
            'mdi': './fonts/material-design-icons.css'
        })

    ],
    declarations: [
        declareComponents,
    ],
    providers: [    
                    ModalDialogService, TrackService, SharedService, TrackHttpService,
                    { provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true }
               ]
})
export class TrackModule { }

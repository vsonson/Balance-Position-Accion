import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { FormsModule } from '@angular/forms';
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptFormsModule } from "nativescript-angular/forms"
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { routes, declareComponents } from './myplaybook.routing';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { DataService } from "./data.service";
// import { LoaderComponent } from './../../common/components/loader/loader.component';
import { MyPlayBookService } from './myplaybook.service'
@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
    entryComponents: [],
    imports: [
        NativeScriptRouterModule,
        NativeScriptRouterModule.forChild(routes),
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        FormsModule,
        TNSFontIconModule.forRoot({
            'fa': './fonts/font-awesome.css',
            'mdi': './fonts/material-design-icons.css'
        })

    ],
    declarations: [
        declareComponents,
        // LoaderComponent
    ],
    providers: [ModalDialogService, DataService, MyPlayBookService]
})
export class MyPlayBookModule { }

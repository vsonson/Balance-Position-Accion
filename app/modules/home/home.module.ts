import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptFormsModule } from "nativescript-angular/forms"
import { HomeComponent } from './home.component';
import { DashBoardComponent } from './dashboard/dashboard.component';
import { PracticeComponent } from './practice/practice.component';
import { FoundationPrograms } from './foundationPrograms/foundationPrograms.component';
import { FoundationAudio } from './foundationAudio/foundationAudio.component';
import { FoundationVideo } from './foundationVideo/foundationVideo.component';
import { NoteBookComponent } from './notebook/notebook.component'
import { PracticeModal } from './practiceModal/practiceModal.component';
import { routes } from './home.routing';
import { Observable } from 'rxjs/Rx'
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer, SideDrawerLocation } from 'nativescript-ui-sidedrawer';
import { SharedService } from './../../common/services/shared.service';
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { HttpClientInterceptor } from '../../common/services/interceptor.service';
import { HomeHttpService } from './home-http.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NetworkComponent } from './network/network.component';
import { NetworkModalComponent } from './network/networkModal/networkModal.component';

//common
import { HomeUI, HomeUIScope } from './home-ui.service';
import { BottomTabComponent } from './../../common/components/bottom-tab/bottom-tab.component';
import { NotedialogboxComponent } from './../../common/components/notedialogbox/notedialogbox.component';

import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

import { MinLengthDirective, IsEmailDirective } from './../../common/directives/directives-index';

import { TNSFrescoModule } from "nativescript-fresco/angular";
import * as frescoModule from "nativescript-fresco";
import * as applicationModule from "tns-core-modules/application";

if (applicationModule.android) {
    applicationModule.on("launch", () => {
        frescoModule.initialize();
    });
}

@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
    entryComponents: [ PracticeModal, NotedialogboxComponent,NetworkModalComponent],
    imports: [
        NativeScriptRouterModule,
        NativeScriptRouterModule.forChild(routes),
        NativeScriptCommonModule,
        NativeScriptUISideDrawerModule,
        NativeScriptUIListViewModule,
        NativeScriptHttpClientModule,
        NativeScriptFormsModule,
        TNSFontIconModule.forRoot({
            'fa': './fonts/font-awesome.css',
            'mdi': './fonts/material-design-icons.css'
        }),
        TNSFrescoModule,
        NativeScriptUIChartModule


    ],
    declarations: [
        HomeComponent,
        NetworkComponent,
        NetworkModalComponent,
        BottomTabComponent,
        PracticeComponent,
        FoundationPrograms,
        DashBoardComponent,
        NotedialogboxComponent,
        PracticeModal,
        NoteBookComponent,
        FoundationAudio,
        FoundationVideo,
        IsEmailDirective,
        MinLengthDirective
    ],
    providers: [ModalDialogService, HomeUI, HomeUIScope, SharedService, HomeHttpService, { provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true }],
    exports: [NotedialogboxComponent],
    bootstrap: [HomeComponent],
})
export class HomeModule { }

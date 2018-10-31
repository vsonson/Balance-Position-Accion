import { NgModule, NO_ERRORS_SCHEMA, NgModuleFactoryLoader } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule, NSModuleFactoryLoader } from "nativescript-angular/router";
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx'
import { CommonModule } from "@angular/common";
import { AppComponent } from "./app.component";
import { PrivacyPolicyComponent } from './modules/privacy_policy/privacyPolicy.component';
import { TermsOfServiceComponent } from './modules/termsOfService/termsOfService.component';
import { routing } from "./app.routing";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';
import { NativeScriptHttpModule } from "nativescript-angular";
import { AuthGuard } from './common/services/auth.guard';
import { AlertComponent } from './modules/alert/index';
import { InAppBrowserComponent } from './common/components/in-app-browser/in-app-browser.component';
import { MyDataModalComponent } from "./modules/home/dashboard/myDataModal/myDataModal.component";
import { TimePickerComponent } from './modules/drawer-items/timepickerModal/timepicker.component';
import { LoaderScope, Loader } from './common/components/loader/loader.service';
import { Navigation, Utility } from './common/services/common.service';

import { LoginAuthGuard } from './common/services/route.guard';
import { SharedService } from './common/services/shared.service';

import * as frescoModule from "nativescript-fresco";
import * as applicationModule from "tns-core-modules/application";
if (applicationModule.android) {
  applicationModule.on("launch", () => {
    frescoModule.initialize();
  });
}


// import { TNSFrescoModule } from "nativescript-fresco/angular";

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    TimePickerComponent,
    // LoaderComponent,
    MyDataModalComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
    InAppBrowserComponent
    // MinLengthDirective, 
    // IsEmailDirective
  ],
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    CommonModule,
    NativeScriptRouterModule,
    routing,
    HttpModule,
    TNSCheckBoxModule,
    NativeScriptHttpModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [
    NativeScriptModule,
    NativeScriptRouterModule,
    AlertComponent,
    TNSCheckBoxModule
  ],
  providers: [
    AuthGuard,
    LoaderScope,
    SharedService,
    Loader,
    Utility,
    Navigation,
    LoginAuthGuard,
    ModalDialogService,
    // ...services.serviceContainer,

    {

      provide: NgModuleFactoryLoader,
      useClass: NSModuleFactoryLoader
    }
  ],
  entryComponents: [TimePickerComponent, MyDataModalComponent]
})
export class AppModule { }

import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular";
import { routes } from './auth.routing';
import { AuthComponent } from "./auth.component";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { QuoteComponent } from "./quote/quote.component";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { ResetpasswordComponent } from "./resetpassword/resetpassword.component";
import { ForgetpasswordComponent } from "./forgetpassword/forgetpassword.component";
import { ChangepasswordComponent } from "./changepassword/changepassword.component";
import { AuthModalComponent } from './authmodal/authmodal.component';
import { LoaderComponent } from './../../common/components/loader/loader.component';
import * as services from './../../common/services/services-index';
import { UserService } from "./shared/user/user.service"
import { SharedService } from './../../common/services/shared.service';
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { HttpClientInterceptor } from '../../common/services/interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import * as application from 'application';


@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule,
        NativeScriptHttpClientModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forChild(routes),
        TNSFontIconModule.forRoot({
            'fa': './fonts/font-awesome.css',
            'mdi': './fonts/material-design-icons.css'
        }),
    ],
    declarations: [
        AuthComponent,
        SigninComponent,
        SignupComponent,
        ForgetpasswordComponent,
        ResetpasswordComponent,
        ChangepasswordComponent,
        AuthModalComponent,
        QuoteComponent,
        LoaderComponent
    
    ],
    providers: [
        ...services.serviceContainer, UserService, SharedService, { provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true }
    ],
    entryComponents: [
        //  ModalComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AuthModule { }

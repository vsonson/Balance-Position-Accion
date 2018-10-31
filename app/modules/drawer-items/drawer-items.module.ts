import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { DrawerItemComponent } from './drawer-items.component';
import { routes } from './drawer-items.routing';
import { HttpModule } from '@angular/http';
import { SettingComponent } from './setting/setting.component';
import { ResourcesComponent } from './resources/resources.component';
import { ReferComponent } from './refer/refer.component';
import { PremiumComponent } from './premium/premium.component';
import { ModalComponent } from './modal/modal.component';
import { DeactivateModalComponent } from './deactivateModal/deactivateModal.component';
import { DeactivateAccountModalComponent } from './deactivateAccountModal/deactivateAccountModal.component';
import { DeactivateFormModalComponent } from './deactivateFormModal/deactivateFormModal.component';
import { ReferModalComponent } from './referModal/referModal.component';
import { FAQModalComponent } from './faq-modal/faq-modal.component';
import { FormsModule } from '@angular/forms';
import { NativeScriptFormsModule } from "nativescript-angular/forms"
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { FAQ1ModalComponent } from "./faq-1-modal/faq-1-modal.component";
import { FAQ2ModalComponent } from "./faq2modal/faq2modal.component";
import { FAQ3ModalComponent } from "./faq3modal/faq3modal.component";
import { FAQ4ModalComponent } from "./faq4modal/faq4modal.component";
import { FAQ5ModalComponent } from "./faq5modal/faq5modal.component";
import { FAQ6ModalComponent } from "./faq6modal/faq6modal.component";
import { FAQ7ModalComponent } from "./faq7modal/faq7modal.component";
import { FAQ8ModalComponent } from "./faq8modal/faq8modal.component";
import { FAQ9ModalComponent } from "./faq9modal/faq9modal.component";
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { NativeScriptHttpModule } from "nativescript-angular";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { HttpClientInterceptor } from '../../common/services/interceptor.service';
import { DrawerHttpService } from './drawer-http-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedService } from './../../common/services/shared.service';

@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
    entryComponents: [ModalComponent, FAQ9ModalComponent, FAQ7ModalComponent, FAQ8ModalComponent, FAQ5ModalComponent, FAQ6ModalComponent, DeactivateModalComponent, FAQ1ModalComponent, FAQ2ModalComponent, FAQ3ModalComponent, FAQ4ModalComponent, DeactivateAccountModalComponent, ReferModalComponent, DeactivateFormModalComponent],
    imports: [
        NativeScriptRouterModule,
        NativeScriptRouterModule.forChild(routes),
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        FormsModule,
        HttpModule,
        NativeScriptHttpModule,
        TNSFontIconModule.forRoot({
            'fa': './fonts/font-awesome.css',
            'mdi': './fonts/material-design-icons.css'
        })

    ],
    declarations: [
        DrawerItemComponent,
        SettingComponent,
        ReferComponent,
        PremiumComponent,
        ModalComponent,
        DeactivateModalComponent,
        DeactivateAccountModalComponent,
        DeactivateFormModalComponent,
        ReferModalComponent,
        ResourcesComponent,
        FAQModalComponent,
        FAQ1ModalComponent,
        FAQ2ModalComponent,
        FAQ3ModalComponent,
        FAQ4ModalComponent,
        FAQ5ModalComponent,
        FAQ6ModalComponent,
        FAQ7ModalComponent,
        FAQ8ModalComponent,
        FAQ9ModalComponent,
    ],
    providers: [ModalDialogService, SharedService, DrawerHttpService, { provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true }]
})
export class DrawerItemsModule { }

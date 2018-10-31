import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { PrivacyPolicyComponent } from './modules/privacy_policy/privacyPolicy.component';
import { TermsOfServiceComponent } from './modules/termsOfService/termsOfService.component';
import { PreloadAllModules } from "@angular/router";
import { LoginAuthGuard } from './common/services/route.guard';
import { AppComponent } from "./app.component";

var excludedComponents = [];

let APP_ROUTES: Routes = [

    { path: '', redirectTo: '/auth/signin', pathMatch: 'full' },

    {
        path: "home",
        loadChildren: "./modules/home/home.module#HomeModule"
    },
    {
        path: "auth",
        loadChildren: "./modules/auth/auth.module#AuthModule",
        canActivate: [LoginAuthGuard]
    },
    {
        path: "drawerItems",
        loadChildren: "./modules/drawer-items/drawer-items.module#DrawerItemsModule"
    },

    {
        path: "myplaybook",
        loadChildren: './modules/myplaybook/myplaybook.module#MyPlayBookModule'

    },
    {
        path: "datapoints",
        loadChildren: './modules/datapoints/datapoints.module#DatapointsModule'

    },
    {
        path: "track",
        loadChildren: './modules/track/track.module#TrackModule'

    },
    {
        path: "privacy_policy",
        component: PrivacyPolicyComponent
    },
    {
        path: "terms_conditions",
        component: TermsOfServiceComponent
    }
];

export const routing = NativeScriptRouterModule.forRoot(APP_ROUTES,
    { preloadingStrategy: PreloadAllModules });

import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

// import { ItemsComponent } from "./item/items.component";
// import { ItemDetailComponent } from "./item/item-detail.component";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { ResetpasswordComponent } from "./resetpassword/resetpassword.component";
import { ForgetpasswordComponent } from "./forgetpassword/forgetpassword.component";
import { ChangepasswordComponent } from "./changepassword/changepassword.component";
import { QuoteComponent } from "./quote/quote.component"
import { AuthComponent } from './auth.component';

// import { MybodyComponent } from "./mybody/mybody.component";
// import { DashboardComponent } from "./dashboard/dashboard.component";

export const routes: Routes = [
    {  
    	path: "", 
    	component: AuthComponent ,
    	children: [
    		{ 
                path: "signin", 
                component: SigninComponent 
            },
    		{ 
                path: "signup", 
                component: SignupComponent 
            },
    		{ 
                path: "reset", 
                component: ResetpasswordComponent 
            },
    		{ 
                path: "forgetpassword", 
                component: ForgetpasswordComponent 
            },
            { 
                path: "changepassword", 
                component: ChangepasswordComponent 
            },
            {
                path: "quote", 
                component: QuoteComponent 
            }
    	]
	}
];

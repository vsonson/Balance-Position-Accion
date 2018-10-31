	import { Injectable }     from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot }    from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { SharedService } from './services-index';

@Injectable()
export class LoginAuthGuard implements CanActivate {

  constructor(private sharedService: SharedService, private router: RouterExtensions) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('AuthGuard#canActivate called', route.url, "State: ", state.url);
    if(state.url == '/auth/forgetpassword' || state.url == '/auth/changepassword' || state.url == '/auth/quote' || state.url == '/auth/reset') return true;
    if(!this.sharedService.getAuthHeader()) {
    	return true;
 	} else {
 		this.router.navigate(['/home/dashboard']);
 		return false;
 	}

  }
}
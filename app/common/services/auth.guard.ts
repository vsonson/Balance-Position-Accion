import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {SharedService } from './services-index';
import { Router,CanActivateChild } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate,CanActivateChild {
  constructor(private sharedService:SharedService,private router:Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(!this.sharedService.getToken()) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(!this.sharedService.getToken()){
        this.router.navigate(['/login']);
        return false;
      }
      return true;
  }
}

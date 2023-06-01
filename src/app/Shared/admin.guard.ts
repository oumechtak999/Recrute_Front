import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../services/Authentications/Authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  currentrole: any;
  constructor(private service: AuthenticationService, private route: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.service.IsLoggedIn()) {
      this.currentrole = this.service.GetRolebyToken(this.service.GetToken());
      if (this.currentrole == 'Admin') {
        return true;
      } else {
        alert('you are not authorized  to access this menu Admin');
        this.route.navigate(['login']);
        return false;
      }
    } else {
      this.route.navigate(['login']);
      return false;
    }
  }

}

import { Injectable } from '@angular/core';
import {LoginService} from './login.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate{

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('1');
    if (this.loginService.isAutorized) {
      console.log('2');
      return true;
    } else {
      console.log('asd');
/*      this.router.navigate(['/403']);*/
      return false;
    }
  }
}

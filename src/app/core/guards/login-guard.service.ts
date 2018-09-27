import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.loginService.getUser()) { // проверка, есть ли в localeStorage информация о пользователе
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

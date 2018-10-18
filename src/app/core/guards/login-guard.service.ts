import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import {SidebarService} from '../services/sidebar.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(private loginService: LoginService,
              private sidebarService: SidebarService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.loginService.getUser()) { // проверка, есть ли в localeStorage информация о пользователе
      this.sidebarService.followInit$.next(true);
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

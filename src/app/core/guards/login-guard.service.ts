import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import {FollowService} from '../../main/service/follow.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(private loginService: LoginService,
              private followService: FollowService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.loginService.getUser()) { // проверка, есть ли в localeStorage информация о пользователе
      this.followService.followInit$.next(true);
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

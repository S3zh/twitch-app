import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { SearchService } from '../services/search.service';
import { User } from '../interfaces/user';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {

  inputValue: FormControl = new FormControl('');
  user: User;
  userToken: string;
  isAuth = false;
  private ngUnsubscribe$ = new Subject();

  constructor(private searchService: SearchService,
              private loginService: LoginService,
              private router: Router,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.checkUserAuth(); // проверка авторизации
    this.checkSearch(); // подписка на поиск
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }

  checkUserAuth() {
    this.user = this.loginService.getUser(); // пытаемся получить пользователя из localStorage
    if (this.user) { // если он есть убираем кнопку авторизации в хедере и отправляем его на страницу с играми
      this.isAuth = this.user.valid;
      this.router.navigate(['']);
    } else { // если localStorage пуст, нужно проверить не пришел ли токен
      this.userToken = window.location.hash.substr(14, 30); // записываем токен (если он есть отправим запрос)
      if (this.userToken) { // токен пришел, нужно отправить запрос к API, чтобы получить информацию по пользователю
        this.authUser(this.userToken);
      } // если токена нет, ничего не делаем, пользователю еще нужно авторизироваться
    }
  }

  checkSearch() {
    this.inputValue.valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this.ngUnsubscribe$))
      .subscribe((value) => {
        if (value) {
          this.searchInit();
        } else {
          this.gamesInit();
        }
        this.cd.markForCheck();
      });
  }

  authUser(token: string) {
    this.loginService.authUser(token)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((answer: User) => {
        if (!answer.valid) { // если токен не валидный, или запрос крашнулся
          this.router.navigate(['/login']);
        } else { // если все нормально
          this.user = answer; // записываем информацию пользователя, что бы использовать его ник в хедере
          this.isAuth = this.user.valid; // меняем метку на true, чтобы убрать кнопку авторизации
          this.loginService.setUser(this.user); // записываем информацию о пользователе в localeStorage
          this.router.navigate(['']); // отправляем его на страницу с играми, так как он авторизовался
        }
        this.cd.markForCheck();
      });
  }

  searchInit() {
    this.searchService.searchQuery$.next(this.inputValue.value);
    this.router.navigate([`/search/${this.inputValue.value}`]);
  }

  gamesInit() {
    this.router.navigate(['/games']);
  }

  logOut() {
    this.loginService.removeUser(); // удаляем пользователя из localStorage
    this.isAuth = false; // показываем кнопку авторизации
    this.user = null; // удаляем информацию о пользователе в компоненте
    this.userToken = ''; // удаляем токен по которому была авторизация
    this.router.navigate(['/login']); // перенаправляем его для авторизации
    this.cd.markForCheck();
  }
}

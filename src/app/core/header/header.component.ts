import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from '../services/search.service';
import {User} from '../interfaces/user';
import {Subject} from 'rxjs';
import {FormControl} from '@angular/forms';
import {debounceTime, filter, takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  inputValue: FormControl = new FormControl('');
  user: User;
  userToken: string;
  isAuth = false;
  private ngUnsubscribe$ = new Subject();

  constructor(private searchService: SearchService,
              private loginService: LoginService,
              private router: Router) {}

  ngOnInit() {
    this.userToken = window.location.hash.substr(14, 30);
    this.checkUser(this.userToken);
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
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }

  checkUser(token: string) {
    this.loginService.checkOaut(token)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((answer: User) => {
        this.user = answer;
        this.isAuth = this.user.valid;
        console.log(this.user);
      });
  }

  searchInit() {
    this.searchService.searchQuery$.next(this.inputValue.value);
    this.router.navigate([`/search/${this.inputValue.value}`]);
  }

  gamesInit() {
    this.router.navigate(['/games']);
  }

  logOut(token: string) {
    this.loginService.logOut(token);
    this.isAuth = false;
    this.user = null;
    this.userToken = '';
  }
}

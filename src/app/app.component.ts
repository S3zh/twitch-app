import { Component, OnInit, OnDestroy} from '@angular/core';
import {StreamService} from './stream.service';
import {User} from './user';
import {takeUntil} from 'rxjs/operators';
import {BehaviorSubject, Subject} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  static checkSearchInit$ = new BehaviorSubject('');
  private ngUnsubscribe$ = new Subject();
  inputValue: string;
  user: User;

  constructor(private streamService: StreamService,
              private router: Router) {}

  ngOnInit() {
    this.checkUser();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }

  checkUser() {
    this.streamService.checkOaut()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((answer: User) => {
        this.user = answer;
      });
  }

  searchInit() {
    this.router.navigate([`/search/${this.inputValue}`]);
    AppComponent.checkSearchInit$.next(this.inputValue);
    this.inputValue = '';
  }

}

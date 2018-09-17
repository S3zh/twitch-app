import { Component, OnInit, OnDestroy} from '@angular/core';
import {StreamService} from './stream.service';
import {User} from './user';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {BehaviorSubject, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  static checkSearchInit$ = new BehaviorSubject('');
  private ngUnsubscribe$ = new Subject();
  inputValue: FormControl = new FormControl('');
  user: User;

  constructor(private streamService: StreamService,
              private router: Router) {}

  ngOnInit() {
    this.checkUser();
    this.inputValue.valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this.ngUnsubscribe$))
      .subscribe(() => {
        this.searchInit();
      });
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
    if (!this.inputValue.value) {return; }
    this.router.navigate([`/search/${this.inputValue.value}`]);
    AppComponent.checkSearchInit$.next(this.inputValue.value);
  }
}

import {Component, OnInit, OnDestroy} from '@angular/core';
import {StreamService} from './stream.service';
import {User} from './user';
import {debounceTime, takeUntil, filter} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

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
        takeUntil(this.ngUnsubscribe$),
        filter((value) => !!value))
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
    this.streamService.searchQuery$.next(this.inputValue.value);
    this.router.navigate([`/search/${this.inputValue.value}`]);
  }

}

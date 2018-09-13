import { Component, OnInit, OnDestroy} from '@angular/core';
import {StreamService} from './stream.service';
import {User} from './user';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  user: User;
  private ngUnsubscribe$ = new Subject();
  inputValue: string;

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
    this.inputValue = '';
  }

}

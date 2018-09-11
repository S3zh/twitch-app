import { Component, OnInit, OnDestroy} from '@angular/core';
import {StreamService} from './stream.service';
import {User} from './user';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  user: User;
  private ngUnsubscribe$ = new Subject();

  constructor(private streamService: StreamService) {}

  ngOnInit() {
    this.checkUser();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }

  checkUser() {
    this.streamService.checkOaut().pipe(
        takeUntil(this.ngUnsubscribe$)
      ).subscribe(
      (answer: any) => {
        this.user = answer.token;
      });
  }

}

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
  private subject = new Subject();


  constructor(private streamService: StreamService) {}

  ngOnInit() {
    this.checkUser();
  }

  ngOnDestroy(){
    this.subject.next(true);
    this.subject.complete();
  }

  checkUser() {
    this.streamService.checkOaut().pipe(takeUntil(this.subject)).subscribe(
      (answer: any) => {
        this.user = answer.token;
      });
  }

}

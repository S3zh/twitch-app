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

  constructor() {}

  ngOnDestroy() {}

  ngOnInit() {}
}

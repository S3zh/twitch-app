import {Component, OnInit, OnDestroy} from '@angular/core';
import {StreamService} from '../stream.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Stream} from '../stream';
import {AppComponent} from '../app.component';

@Component ({
  selector: 'app-search-stream',
  templateUrl: './search-stream.component.html',
  styleUrls: ['./search-stream.component.css']
})

export class SearchStreamComponent implements OnInit, OnDestroy {

  isNotEmpty = true;
  streams: Array<Stream>;
  private ngUnsubscribe$ = new Subject();

  constructor (private streamService: StreamService,
               private route: ActivatedRoute,
               private location: Location) {}

  ngOnInit () {
    AppComponent.checkSearchInit$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((query: string) => {
        this.searchStreams(query);
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }

  searchStreams(query: string) {
    this.streamService.searchStreams(query)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((answer: Array<Stream>) => {
        this.isNotEmpty = !!answer.length;
        this.streams = answer;
      });
  }

  getUrl(subUrl: string) {
    return `/stream/${subUrl}`;
  }
}

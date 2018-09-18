import {Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {StreamService} from '../stream.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Stream} from '../stream';

@Component ({
  selector: 'app-search-stream',
  templateUrl: './search-stream.component.html',
  styleUrls: ['./search-stream.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class SearchStreamComponent implements OnInit, OnDestroy {

  isNotEmpty = true;
  streams: Array<Stream>;
  private ngUnsubscribe$ = new Subject();

  constructor (private streamService: StreamService,
               private cd: ChangeDetectorRef) {}

  ngOnInit () {
    this.streamService.searchQuery$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((query) => {
        this.searchStreams(query);
        this.cd.markForCheck();
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
        this.cd.markForCheck();
      });
  }

  getUrl(subUrl: string) {
    return `/stream/${subUrl}`;
  }
}

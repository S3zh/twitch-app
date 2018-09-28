import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from '../../core/services/search.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Stream } from '../interfaces/stream';

@Component({
  selector: 'app-search-stream',
  templateUrl: './search-stream.component.html',
  styleUrls: ['./search-stream.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SearchStreamComponent implements OnInit, OnDestroy {

  isNotEmpty = true;
  streams: Array<Stream>;
  isLoaded: boolean;
  private ngUnsubscribe$ = new Subject();

  constructor(private searchService: SearchService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.searchService.searchQuery$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((query) => {
        this.isLoaded = false;
        this.searchStreams(query);
        this.cd.markForCheck();
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }

  searchStreams(query: string) {
    this.searchService.searchStreams(query)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((answer: Array<Stream>) => {
        this.isLoaded = true;
        this.isNotEmpty = !!answer.length;
        this.streams = answer;
        this.cd.markForCheck();
      });
  }

  getUrl(subUrl: string) {
    return `/stream/${subUrl}`;
  }
}

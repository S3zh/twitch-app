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
  streams: Array<Stream> = [];
  isLoaded: boolean;
  batch = 0;
  searchQuery: string;
  private ngUnsubscribe$ = new Subject();

  constructor(private searchService: SearchService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.searchService.searchQuery$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((query) => {
        this.isLoaded = false;
        this.searchQuery = query;
        this.batch = 0;
        this.streams = []; // Обнуляем значения так как пользователь изменид строку запроса
        this.searchStreams(this.searchQuery);
        this.cd.markForCheck();
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }

  searchStreams(query: string) {
    this.searchService.searchStreams(query, this.batch++)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((answer: Array<Stream>) => {
        this.isLoaded = true;
        this.isNotEmpty = !!answer.length;
        this.streams.push(...answer);
        this.cd.markForCheck();
      });
  }

  onScroll() {
    this.searchStreams(this.searchQuery);
  }
}

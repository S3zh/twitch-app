import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { StreamService } from '../service/stream.service';
import { ActivatedRoute } from '@angular/router';
import { Stream } from '../interfaces/stream';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class StreamsComponent implements OnInit, OnDestroy {

  isLoading: boolean;
  streams: Array<Stream> = [];
  batch = 0;
  private ngUnsubscribe$ = new Subject();

  constructor(private streamService: StreamService,
              private route: ActivatedRoute,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.getStreams();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }

  onScroll() {
    this.getStreams();
  }

  getStreams() {
    const game = this.route.snapshot.paramMap.get('game');
    this.streamService.getStreams(game, this.batch++)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((answer: Array<Stream>) => {
        this.streams.push(...answer);
        this.isLoading = false;
        this.cd.markForCheck();
      });
  }

}

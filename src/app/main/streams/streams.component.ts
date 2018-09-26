import { Component, OnDestroy, OnInit } from '@angular/core';
import { StreamService } from '../service/stream.service';
import { ActivatedRoute } from '@angular/router';
import { Stream } from '../interfaces/stream';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
  //OnPush
})

export class StreamsComponent implements OnInit, OnDestroy {

  streams: Array<Stream>;
  private ngUnsubscribe$ = new Subject();

  constructor(private streamService: StreamService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getStreams();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }

  getStreams() {
    const game = this.route.snapshot.paramMap.get('game');
    this.streamService.getStreams(game)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((answer: Array<Stream>) => {
        this.streams = answer;
      });
  }

}

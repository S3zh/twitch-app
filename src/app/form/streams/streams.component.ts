import {Component, OnInit, OnDestroy} from '@angular/core';
import {StreamService} from '../../stream.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Stream} from '../../stream';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})

export class StreamsComponent implements OnInit, OnDestroy {

  private streams: Array<Stream>;
  private ngUnsubscribe$ = new Subject();

  constructor(private streamService: StreamService,
              private route: ActivatedRoute,
              private location: Location) {}

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

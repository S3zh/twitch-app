import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { StreamService } from '../service/stream.service';
import { ActivatedRoute } from '@angular/router';
import { Stream } from '../interfaces/stream';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-stream-view',
  templateUrl: './stream-view.component.html',
  styleUrls: ['./stream-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StreamViewComponent implements OnInit, OnDestroy {

  streamUrl: string;
  chatUrl: string;
  stream: Stream;
  @ViewChild('iframe') frameStream: ElementRef;
  private ngUnsubscribe$ = new Subject();

  constructor(private streamService: StreamService,
              private route: ActivatedRoute,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.getStream();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }

  getStream() {
    const name = this.route.snapshot.paramMap.get('name');
    this.streamService.getStream(name)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((answer: Stream) => {
        this.stream = answer;
        this.streamUrl = `https://player.twitch.tv/?channel=${this.stream.channel['name']}&autoplay=false`;
        this.chatUrl = `https://www.twitch.tv/embed/${this.stream.channel['name']}/chat`;
        this.cd.markForCheck();
      });

  }

}

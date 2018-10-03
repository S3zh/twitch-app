import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { StreamService } from '../service/stream.service';
import { ActivatedRoute } from '@angular/router';
import { Stream } from '../interfaces/stream';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {FollowService} from '../service/follow.service';

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
  isLoading = true;
  isFollow = false;
  private ngUnsubscribe$ = new Subject();

  constructor(private streamService: StreamService,
              private followService: FollowService,
              private route: ActivatedRoute,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.streamService.currentStream$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((name) => {
        this.isLoading = true;
        this.getStream(name);
        this.cd.markForCheck();
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }

  getStream(name: string) {
    this.streamService.getStream(name)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((answer: Stream) => {
        this.stream = answer;
        this.isLoading = false;
        this.checkFollow(this.stream.channel._id);
        this.streamUrl = `https://player.twitch.tv/?channel=${this.stream.channel['name']}&autoplay=false`;
        this.chatUrl = `https://www.twitch.tv/embed/${this.stream.channel['name']}/chat`;
        this.cd.markForCheck();
      });
  }

  checkFollow(channelId: number) {
    this.followService.checkFollow(channelId)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(
        () => {
        this.isFollow = true;
        this.cd.markForCheck();
      },
       () => {
        this.isFollow = false;
        this.cd.markForCheck();
      });
  }

  follow() {
    this.followService.follow(this.stream.channel._id)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => {
        this.followService.followInit$.next(true);
        this.isFollow = true;
        this.cd.markForCheck();
      });
  }

  unfollow() {
    this.followService.unfollow(this.stream.channel._id)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => {
        this.followService.followInit$.next(true);
        this.isFollow = false;
        this.cd.markForCheck();
      });
  }
}

import {Component, OnInit, OnDestroy} from '@angular/core';
import {StreamService} from '../stream.service';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Stream} from '../stream';
import { takeUntil } from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-stream-view',
  templateUrl: './stream-view.component.html',
  styleUrls: ['./stream-view.component.css']
})
export class StreamViewComponent implements OnInit, OnDestroy {

  streamUrl: string;
  chatUrl: string;
  stream: Stream;
  private subject = new Subject();

  constructor(private streamService: StreamService,
        private route: ActivatedRoute,
        private location: Location) {}

  ngOnInit () {
    this.getStream();
  }

  ngOnDestroy() {
    this.subject.next(true);
    this.subject.complete();
  }

  getStream() {
    const name = this.route.snapshot.paramMap.get('name');
    this.streamService.getStream(name).pipe(takeUntil(this.subject)).subscribe(
      (answer: any) => {
        this.stream = answer.stream;
        this.streamUrl = `https://player.twitch.tv/?channel=${this.stream.channel['name']}&autoplay=false`;
        this.chatUrl = `https://www.twitch.tv/embed/${this.stream.channel['name']}/chat`;
      });

  }
}

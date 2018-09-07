import {Component, OnInit} from '@angular/core';
import {StreamService} from '../stream.service';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Stream} from '../stream';

@Component({
  selector: 'stream-view',
  templateUrl: './stream-view.component.html',
  styleUrls: ['./stream-view.component.css']
})
export class StreamViewComponent implements OnInit {

  streamUrl: string;
  chatUrl: string;
  stream: Stream;

  constructor(private streamService: StreamService,
        private route: ActivatedRoute,
        private location: Location) {}

  ngOnInit () {
    this.getStream();
  }

  getStream() {
    const name = this.route.snapshot.paramMap.get('name');
    this.streamService.getStream(name).subscribe(
      (answer: object) => {
        this.stream = answer['stream'];
        this.streamUrl = 'https://player.twitch.tv/?channel=' + this.stream.channel['name'] + '&autoplay=false';
        this.chatUrl = 'https://www.twitch.tv/embed/' + this.stream.channel['name'] + '/chat';
      });

  }
}

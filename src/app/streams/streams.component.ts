import {Component, OnInit} from '@angular/core';
import {StreamService} from '../stream.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';



@Component({
  selector: 'streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})

export class StreamsComponent implements OnInit {

  private streams: Array<object>;

  constructor(private streamService: StreamService,
              private route: ActivatedRoute,
              private location: Location) {}

  ngOnInit() {
    this.getStreams();
  }

  getStreams() {
    const game = this.route.snapshot.paramMap.get('game');
    this.streamService.getStreams(game).subscribe(
      (answer: object) => {
        this.streams = answer["streams"];
        console.log(this.streams);
      })
  }

}

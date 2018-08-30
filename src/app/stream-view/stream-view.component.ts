import {Component, OnInit} from '@angular/core';
import {StreamService} from '../stream.service';

@Component({
  selector: 'stream-view',
  templateUrl: './stream-view.component.html',
  styleUrls: ['./stream-view.component.css']
})
export class StreamViewComponent implements OnInit {

	stream: object;

	constructor(private streamService: StreamService) {}

	ngOnInit () {
		this.getStream();	
	}

	getStream() {
		this.streamService.getStream().subscribe(
			(answer: object) => {
				console.log(answer);
				this.stream = answer;
			});

	}


}
import {Component, OnInit} from '@angular/core';
import {StreamService} from '../stream.service';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'stream-view',
  templateUrl: './stream-view.component.html',
  styleUrls: ['./stream-view.component.css']
})
export class StreamViewComponent implements OnInit {

	name: string;
	stream: object;
	streamUrl: string;
	chatUrl: string;

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
				console.log(answer);
				if (answer['stream'] === null){
					console.log('null');
					return;
				}
				this.stream = answer["stream"];
				this.name = answer["stream"].channel.name;
				this.streamUrl="https://player.twitch.tv/?channel="+this.name+"&autoplay=false";
				this.chatUrl = "https://www.twitch.tv/embed/"+this.name+"/chat";
			});

	}

}
import {Component, OnInit} from '@angular/core';
import {StreamService} from '../stream.service';

@Component ({
	selector: 'games',
	templateUrl: './games.component.html',
	styleUrls: ['./games.component.css']
})

export class GamesComponent implements OnInit {

	games: Array<object>;

	constructor (private streamService: StreamService){}

	ngOnInit(){
		this.getGames();
		
	}

	getGames () {
		this.streamService.getGames().subscribe(
			(answer: object) => {
				console.log('Games:', answer);
				this.games = answer['top'];
				console.log(this.games);
			})
	}
	
}


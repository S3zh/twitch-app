import {Component, OnInit} from '@angular/core';
import {StreamService} from '../stream.service';
import {Game} from '../game';

@Component ({
  selector: 'games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})

export class GamesComponent implements OnInit {

  games: Array<Game>;


  constructor (private streamService: StreamService) {}

  ngOnInit() {
    this.getGames();
  }

  getGames () {
    this.streamService.getGames().subscribe(
      (answer: object) => {
        this.games = answer['top'];
      });
  }

}


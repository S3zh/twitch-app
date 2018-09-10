import {Component, OnInit, OnDestroy} from '@angular/core';
import {StreamService} from '../stream.service';
import {Game} from '../game';
import { takeUntil } from 'rxjs/operators';
import {Subject} from 'rxjs';


@Component ({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})

export class GamesComponent implements OnInit, OnDestroy {

  games: Array<Game>;
  private subject = new Subject();


  constructor (private streamService: StreamService) {}

  ngOnInit() {
    this.getGames();
  }

  ngOnDestroy() {
    this.subject.next();
    this.subject.complete();
  }

  getGames () {
    this.streamService.getGames().pipe(takeUntil(this.subject)).subscribe(
      (answer: any) => {
        this.games = answer.top;
      });
  }

}


import { Component, OnDestroy, OnInit } from '@angular/core';
import { StreamService } from '../service/stream.service';
import { Game } from '../interfaces/game';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
  //OnPush
})

export class GamesComponent implements OnInit, OnDestroy {

  games: Array<Game>;
  private ngUnsubscribe$ = new Subject();

  constructor(private streamService: StreamService) {
  }

  ngOnInit() {
    this.getGames();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  getGames() {
    this.streamService.getGames()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((answer: Array<Game>) => {
        this.games = answer;
      });
  }

}


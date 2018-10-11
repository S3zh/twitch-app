import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { StreamService } from '../service/stream.service';
import { Game } from '../interfaces/game';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GamesComponent implements OnInit, OnDestroy {

  batch = 0;
  games: Array<Game> = [];
  isLoading: boolean;
  private ngUnsubscribe$ = new Subject();

  constructor(private streamService: StreamService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.getGames();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  onScroll() {
    this.getGames();
  }

  getGames() {
    this.streamService.getGames(this.batch++)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((answer: Array<Game>) => {
        this.games.push(...answer);
        this.isLoading = false;
        this.cd.markForCheck();
      });
  }

}


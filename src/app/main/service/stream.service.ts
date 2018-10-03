import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { Game } from '../interfaces/game';
import { Stream } from '../interfaces/stream';
import { GameResponse } from '../interfaces/game-response';
import { StreamsResponse } from '../interfaces/streams-response';
import { StreamResponse } from '../interfaces/stream-response';

@Injectable({
  providedIn: 'root'
})

export class StreamService {

  currentStream$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
  }

  getStream(name: string): Observable<Stream> {
    const url = `https://api.twitch.tv/kraken/streams/${name}?client_id=4osqgh9a16thvsc8qw4dttcf6mrodk`;
    return this.http.get<StreamResponse>(url)
      .pipe(map(result => result.stream),
        catchError(() =>
          of({
            average_fps: 0,
            channel: {},
            created_at: '',
            delay: 0,
            game: '',
            is_playlist: false,
            preview: {},
            stream_type: '',
            video_height: 0,
            viewers: 0
          } as Stream))
      );
  }

  getGames(): Observable<Array<Game>> {
    const url = 'https://api.twitch.tv/kraken/games/top?client_id=4osqgh9a16thvsc8qw4dttcf6mrodk&limit=41';
    return this.http.get<GameResponse>(url)
      .pipe(map(result => result.top),
        catchError(() =>
          of([{
            viewers: 0,
            channels: 0,
            game: {}
          }] as Array<Game>))
      );
  }

  getStreams(game: string): Observable<Array<Stream>> {
    const url = `https://api.twitch.tv/kraken/streams/?client_id=4osqgh9a16thvsc8qw4dttcf6mrodk&limit=44&game=${game}`;
    return this.http.get<StreamsResponse>(url)
      .pipe(map(result => result.streams),
        catchError(() =>
          of([{
            average_fps: 0,
            channel: {},
            created_at: '',
            delay: 0,
            game: '',
            is_playlist: false,
            preview: {},
            stream_type: '',
            video_height: 0,
            viewers: 0
          }] as Array<Stream>))
      );
  }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Game} from './game';
import {Stream} from './stream';
import {User} from './user';
import {GameResponse} from './game-response';
import {UserResponse} from './user-response';
import {StreamsResponse} from './streams-response';
import {StreamResponse} from './stream-response';

@Injectable({
  providedIn: 'root'
})

export class StreamService {

  constructor(private http: HttpClient) {}

  getStream(name: string): Observable<Stream> {
    const url = `https://api.twitch.tv/kraken/streams/${name}?client_id=4osqgh9a16thvsc8qw4dttcf6mrodk`;
    return this.http.get<StreamResponse>(url)
      .pipe(map(result => result.stream),
            catchError(() =>
              of({average_fps: 0,
                  channel: {},
                  created_at: '',
                  delay: 0,
                  game: '',
                  is_playlist: false,
                  preview: {},
                  stream_type: '',
                  video_height: 0,
                  viewers: 0} as Stream))
      );
  }

  getGames(): Observable<Array<Game>> {
    const url = 'https://api.twitch.tv/kraken/games/top?client_id=4osqgh9a16thvsc8qw4dttcf6mrodk&limit=41';
    return this.http.get<GameResponse>(url)
      .pipe(map(result =>  result.top),
            catchError(() =>
              of([{viewers: 0,
                   channels: 0,
                   game: {}}] as Array<Game>))
      );
  }

  getStreams(game: string): Observable<Array<Stream>> {
    const url = `https://api.twitch.tv/kraken/streams/?client_id=4osqgh9a16thvsc8qw4dttcf6mrodk&limit=44&game=${game}`;
    return this.http.get<StreamsResponse>(url)
      .pipe(map(result => result.streams),
            catchError(() =>
              of([{average_fps: 0,
                   channel: {},
                   created_at: '',
                   delay: 0,
                   game: '',
                   is_playlist: false,
                   preview: {},
                   stream_type: '',
                   video_height: 0,
                   viewers: 0}] as Array<Stream>))
      );
  }

  checkOaut(): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/vnd.twitchtv.v5+json',
        'Client-ID': '4osqgh9a16thvsc8qw4dttcf6mrodk',
        'Authorization': 'OAuth mpuzqk755l94o03w1gcsou6o16m1ol'
      })
    };
    return this.http.get<UserResponse>('https://api.twitch.tv/kraken', httpOptions)
      .pipe(map(result => result.token),
            catchError(() =>
              of ({autorization: {},
                   client_id: '',
                   expires_in: 0,
                   user_id: '',
                   user_name: '',
                   valid: false} as User))
      );
  }

  searchStreams(query: string): Observable<Array<Stream>> {
    const url = `https://api.twitch.tv/kraken/search/streams?query=${query}&client_id=4osqgh9a16thvsc8qw4dttcf6mrodk&limit=40`;
    return this.http.get<StreamsResponse>(url)
      .pipe(
        map(result => result.streams),
        catchError(() =>
          of([] as Array<Stream>))
      );
  }

}

import { Injectable } from '@angular/core';
import {LoginService} from './login.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StreamsResponse} from '../../main/interfaces/streams-response';
import {Observable, of} from 'rxjs';
import {Stream} from '../../main/interfaces/stream';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor(private loginService: LoginService,
              private http: HttpClient) {
  }

  getFollowStreams(): Observable<Array<Stream>> {
    const token = this.loginService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': '4osqgh9a16thvsc8qw4dttcf6mrodk',
        'Authorization': `OAuth ${token}`
      })
    };
    return this.http.get<StreamsResponse>('https://api.twitch.tv/kraken/streams/followed', httpOptions)
      .pipe(
        map(result => result.streams),
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

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError, BehaviorSubject} from 'rxjs';
import {Clip} from '../interfaces/clip';
import {ClipResponse} from '../interfaces/clip-response';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClipService {

  clipInit$ = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient) {
  }

  getClips(channel_name: string): Observable<Array<Clip>> {
    let query = 'https://api.twitch.tv/kraken/clips/top?limit=99';
    if (channel_name) {
      query += `&channel=${channel_name}`;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': '4osqgh9a16thvsc8qw4dttcf6mrodk'
      })
    };
    return this.http.get<ClipResponse>(query, httpOptions)
      .pipe(map((answer) => answer.clips),
            catchError((err) => throwError(err))
      );
  }


}

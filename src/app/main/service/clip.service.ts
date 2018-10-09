import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Clip} from '../interfaces/clip';
import {ClipResponse} from '../interfaces/clip-response';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClipService {

  constructor(private http: HttpClient) {
  }

  getClips(): Observable<Array<Clip>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': '4osqgh9a16thvsc8qw4dttcf6mrodk'
      })
    };
    return this.http.get<ClipResponse>('https://api.twitch.tv/kraken/clips/top?limit=99', httpOptions)
      .pipe(map((answer) => answer.clips),
            catchError((err) => throwError(err))
      );
  }
}

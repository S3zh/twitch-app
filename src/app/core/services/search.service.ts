import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { StreamsResponse } from '../../main/interfaces/streams-response';
import { Stream } from '../../main/interfaces/stream';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchQuery$ = new BehaviorSubject('search');

  constructor(private http: HttpClient) {
  }

  searchStreams(query: string, batch: number): Observable<Array<Stream>> {
    const offset = batch * 20;
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': '4osqgh9a16thvsc8qw4dttcf6mrodk'
      })
    };
    const url = `https://api.twitch.tv/kraken/search/streams?query=${query}&offset=${offset}&limit=20`;
    return this.http.get<StreamsResponse>(url, httpOptions)
      .pipe(
        map(result => result.streams),
        catchError((err) =>
          throwError(err))
      );
  }
}

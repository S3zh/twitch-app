import { Injectable } from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {StreamsResponse} from '../../streams-response';
import {Stream} from '../../stream';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchQuery$ = new BehaviorSubject('search');

  constructor(private http: HttpClient) { }

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

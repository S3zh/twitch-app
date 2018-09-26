import { Injectable } from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {User} from '../interfaces/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserResponse} from '../interfaces/user-response';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

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

}

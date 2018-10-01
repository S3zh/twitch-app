import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserResponse } from '../interfaces/user-response';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  localKeyUser = 'user';
  localKeyToken = 'token';

  constructor(private http: HttpClient) {
  }

  authUser(token: string): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': '4osqgh9a16thvsc8qw4dttcf6mrodk',
        'Authorization': `OAuth ${token}`
      })
    };
    return this.http.get<UserResponse>('https://api.twitch.tv/kraken/', httpOptions)
      .pipe(map(result => result.token),
        catchError(() =>
          of({
            autorization: {},
            client_id: '',
            expires_in: 0,
            user_id: '',
            user_name: '',
            valid: false
          } as User))
      );
  }

  setUser(user: User, token: string) {
    localStorage.setItem(this.localKeyUser, JSON.stringify(user));
    localStorage.setItem(this.localKeyToken, token);
  }

  getUser() {
    return JSON.parse(localStorage.getItem(this.localKeyUser));
  }

  getToken() {
    return localStorage.getItem(this.localKeyToken);
  }

  removeUser() {
    localStorage.removeItem(this.localKeyUser);
    localStorage.removeItem(this.localKeyToken);
  }
}

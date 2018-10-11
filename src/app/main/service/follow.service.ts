import { Injectable } from '@angular/core';
import { LoginService } from '../../core/services/login.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Channel} from '../interfaces/channel';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {FollowResponse} from '../interfaces/follow-response';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  followInit$ = new BehaviorSubject<boolean>(null);

  constructor(private loginService: LoginService,
              private http: HttpClient) {
  }

  checkFollow(channelId: number): Observable<Channel> {
    const userId = this.loginService.getUser().user_id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': '4osqgh9a16thvsc8qw4dttcf6mrodk'
      })
    };
    return this.http.get<FollowResponse>(`https://api.twitch.tv/kraken/users/${userId}/follows/channels/${channelId}`, httpOptions)
      .pipe(map((result) => result.channel),
        catchError((err) => throwError(err)));
  }

  follow(channelId: number) {
    const userId = this.loginService.getUser().user_id;
    const token = this.loginService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': '4osqgh9a16thvsc8qw4dttcf6mrodk',
        'Authorization': `OAuth ${token}`
      })
    };
    return this.http.put(`https://api.twitch.tv/kraken/users/${userId}/follows/channels/${channelId}`, null, httpOptions)
      .pipe(
        catchError((err) => throwError(err))
      );
  }

  unfollow(channelId: number) {
    const userId = this.loginService.getUser().user_id;
    const token = this.loginService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': '4osqgh9a16thvsc8qw4dttcf6mrodk',
        'Authorization': `OAuth ${token}`
      })
    };
    return this.http.delete(`https://api.twitch.tv/kraken/users/${userId}/follows/channels/${channelId}`, httpOptions)
      .pipe(
        catchError((err) => throwError(err))
      );
  }
}

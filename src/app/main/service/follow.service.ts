import { Injectable } from '@angular/core';
import { LoginService } from '../../core/services/login.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Channel} from '../interfaces/channel';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {FollowResponse} from '../interfaces/follow-response';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  userId: number = this.loginService.getUser().user_id;
  token: string = this.loginService.getToken();
  followInit$ = new BehaviorSubject<boolean>(true);

  constructor(private loginService: LoginService,
              private http: HttpClient) {
  }

  checkFollow(channelId: number): Observable<Channel> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': '4osqgh9a16thvsc8qw4dttcf6mrodk'
      })
    };
    return this.http.get<FollowResponse>(`https://api.twitch.tv/kraken/users/${this.userId}/follows/channels/${channelId}`, httpOptions)
      .pipe(map((result) => result.channel),
        catchError(() => of({
            display_name: ''
          } as Channel)));
  }

  follow(channelId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': '4osqgh9a16thvsc8qw4dttcf6mrodk',
        'Authorization': `OAuth ${this.token}`
      })
    };
    return this.http.put(`https://api.twitch.tv/kraken/users/${this.userId}/follows/channels/${channelId}`, null, httpOptions);
  }

  unfollow(channelId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': '4osqgh9a16thvsc8qw4dttcf6mrodk',
        'Authorization': `OAuth ${this.token}`
      })
    };
    return this.http.delete(`https://api.twitch.tv/kraken/users/${this.userId}/follows/channels/${channelId}`, httpOptions);
  }
}

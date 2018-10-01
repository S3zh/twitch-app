import { Injectable } from '@angular/core';
import { LoginService } from '../../core/services/login.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private loginService: LoginService,
              private http: HttpClient) {
  }

  checkFollow(channelId: number) {
    const userId = this.loginService.getUser().user_id;
    return this.http.get(`https://api.twitch.tv/kraken/users/${userId}/follows/channels/${channelId}`);
  }
}

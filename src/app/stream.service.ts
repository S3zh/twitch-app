import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class StreamService {

  private gameUrl = 'https://api.twitch.tv/kraken/games/top?client_id=4osqgh9a16thvsc8qw4dttcf6mrodk&limit=12';


  constructor(private http: HttpClient) {}

  getStream(name: string) {
    const url = `https://api.twitch.tv/kraken/streams/${name}?client_id=4osqgh9a16thvsc8qw4dttcf6mrodk`;
    return this.http.get(url);
  }

  getGames() {
    return this.http.get(this.gameUrl);
  }

  getStreams(game: string) {
    const url = `https://api.twitch.tv/kraken/streams/?client_id=4osqgh9a16thvsc8qw4dttcf6mrodk&limit=24&game=${game}`;
    console.log(url);
    return this.http.get(url);
  }

/*	private log(message: string) {
		alert('Ошибка: '+ message);
	}
*/


}

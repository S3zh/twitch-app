import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StreamService {

  private gameUrl = 'https://api.twitch.tv/kraken/games/top?client_id=4osqgh9a16thvsc8qw4dttcf6mrodk&limit=41';


  constructor(private http: HttpClient) {}

  getStream(name: string) {
    const url = `https://api.twitch.tv/kraken/streams/${name}?client_id=4osqgh9a16thvsc8qw4dttcf6mrodk`;
    return this.http.get(url);
  }

  getGames(): Observable<Object> {
    return this.http.get<Object>(this.gameUrl).pipe(
      tap(_ => console.log('Ok')),
      catchError((e) => {console.log('Error');
      return of({error: true} as Object)})
    );
  }

  getStreams(game: string) {
    const url = `https://api.twitch.tv/kraken/streams/?client_id=4osqgh9a16thvsc8qw4dttcf6mrodk&limit=44&game=${game}`;
    return this.http.get(url);
  }

  checkOaut() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/vnd.twitchtv.v5+json',
        'Client-ID': '4osqgh9a16thvsc8qw4dttcf6mrodk',
        'Authorization': 'OAuth cfabdegwdoklmawdzdo98xt2fo512y'
      })
    };
    return this.http.get('https://api.twitch.tv/kraken', httpOptions);
  }

/*	private log(message: string) {
		alert('Ошибка: '+ message);
	}
*/


}

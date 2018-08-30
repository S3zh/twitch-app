import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})

export class StreamService {
	private streamUrl = 'https://api.twitch.tv/kraken/streams/silvername?client_id=4osqgh9a16thvsc8qw4dttcf6mrodk';

	constructor(private http: HttpClient){}

	getStream() {
		return this.http.get(this.streamUrl);
	};	

}

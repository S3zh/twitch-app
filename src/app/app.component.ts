import { Component, OnInit } from '@angular/core';
import {Stream} from './stream';
import {StreamService} from './stream.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'twitch-app';

  stream: object;
  user: object;
  inputValue: string;

  constructor(private streamService: StreamService) {}

  ngOnInit() {
    this.checkUser();
  }

  checkUser() {
    this.streamService.checkOaut().subscribe(
      (answer: object) => {
        console.log(answer);
        this.user = answer["streams"];
        console.log(this.user);
      });
  }
}

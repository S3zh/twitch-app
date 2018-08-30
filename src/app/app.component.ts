import { Component, OnInit } from '@angular/core';
import {Stream} from './stream';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'twitch-app';

  stream: object;

  constructor() {}

  ngOnInit() {
  }

}

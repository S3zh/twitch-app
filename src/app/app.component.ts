import { Component, OnInit } from '@angular/core';
import {StreamService} from './stream.service';
import {User} from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  user: User;

  constructor(private streamService: StreamService) {}

  ngOnInit() {
    this.checkUser();
  }

  checkUser() {
    this.streamService.checkOaut().subscribe(
      (answer: object) => {
        this.user = answer['token'];
      });
  }

}

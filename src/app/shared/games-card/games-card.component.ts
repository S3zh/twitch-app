import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-games-card',
  templateUrl: './games-card.component.html',
  styleUrls: ['./games-card.component.css']
})
export class GamesCardComponent implements OnInit {

  @Input() name: string;
  @Input() viewers: number;
  @Input() src: string;

  constructor() { }

  ngOnInit() {
  }

}

import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stream-card',
  templateUrl: './stream-card.component.html',
  styleUrls: ['./stream-card.component.css']
})
export class StreamCardComponent implements OnInit {

  @Input() name: string;
  @Input() viewers: number;
  @Input() src: string;

  constructor() { }

  ngOnInit() {
  }

}

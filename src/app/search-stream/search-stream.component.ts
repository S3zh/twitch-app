import {Component, OnInit} from '@angular/core';
import {StreamService} from '../stream.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component ({
  selector: 'app-search-stream',
  templateUrl: './search-stream.component.html',
  styleUrls: ['./search-stream.component.css']
})

export class SearchStreamComponent implements OnInit {


  constructor (private streamService: StreamService,
               private route: ActivatedRoute,
               private location: Location) {}

  ngOnInit () {
    this.searchStreams();
    this.searchGames();
  }

  searchStreams() {
    const query = this.route.snapshot.paramMap.get('query');
    this.streamService.searchStreams(query)
      .subscribe(answer => console.log(answer));
  }

  searchGames() {
    const query = this.route.snapshot.paramMap.get('query');
    this.streamService.searchGames(query)
      .subscribe(answer => console.log(answer));
  }
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchStreamComponent} from './search-stream/search-stream.component';
import {StreamsComponent} from './streams/streams.component';
import {StreamViewComponent} from './stream-view/stream-view.component';
import {GamesComponent} from './games/games.component';

const routes: Routes = [
  {path: 'games', component: GamesComponent},
  {path: '', redirectTo: '/games', pathMatch: 'full'},
  {path: 'games/:game', component: StreamsComponent},
  {path: 'stream/:name', component: StreamViewComponent},
  {path: 'search/:query', component: SearchStreamComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

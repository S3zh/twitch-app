import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchStreamComponent} from './search-stream/search-stream.component';
import {GamesComponent} from './games/games.component';
import {StreamsComponent} from './streams/streams.component';
import {StreamViewComponent} from './stream-view/stream-view.component';

const routes: Routes = [
  {path: 'games', component: GamesComponent},
  {path: 'games/:game', component: StreamsComponent},
  {path: 'stream/:name', component: StreamViewComponent},
  {path: 'search/:query', component: SearchStreamComponent},
  {path: '', redirectTo: '/games', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GamesComponent} from './games/games.component';
import {StreamsComponent} from './streams/streams.component';
import {StreamViewComponent} from './stream-view/stream-view.component';
import {SearchStreamComponent} from './search-stream/search-stream.component';

const routes: Routes = [
  {path: 'games', component: GamesComponent},
  {path: 'games/:game', component: StreamsComponent},
  {path: 'stream/:name', component: StreamViewComponent},
  {path: 'search/:query', component: SearchStreamComponent},
  {path: '', redirectTo: '/games', pathMatch: 'full'}
];

@NgModule ({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}

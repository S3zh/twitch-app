import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchStreamComponent } from './search-stream/search-stream.component';
import { StreamsComponent } from './streams/streams.component';
import { StreamViewComponent } from './stream-view/stream-view.component';
import { GamesComponent } from './games/games.component';

const routes: Routes = [
  {path: 'games', component: GamesComponent},
  {path: 'games/:game', component: StreamsComponent},
  {path: 'stream/:name', component: StreamViewComponent},
  {path: 'search/:query', component: SearchStreamComponent},
  {path: '', redirectTo: 'games', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

})
export class MainRoutingModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GamesComponent} from './games/games.component';
import {StreamsComponent} from './streams/streams.component';
import {StreamViewComponent} from './stream-view/stream-view.component';

const routes: Routes = [
	{path: 'games', component: GamesComponent},
/*	{path: '', redirectTo: '/games', pathMatch: 'full'}*/
	{path: 'games/:game', component: StreamsComponent}
]

@NgModule ({
	exports: [RouterModule],
	imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
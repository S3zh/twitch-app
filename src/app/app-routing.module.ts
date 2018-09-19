import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GamesComponent} from './form/games/games.component';


const routes: Routes = [
  {path: 'games', component: GamesComponent},
  {path: '', redirectTo: '/games', pathMatch: 'full'}
];

@NgModule ({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}

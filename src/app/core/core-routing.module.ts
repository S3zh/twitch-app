import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginGuardService} from './services/login-guard.service';
import {LoginComponent} from './login/login.component';
import {MainModule} from '../main/main.module';
import {GamesComponent} from '../main/games/games.component';

const routes: Routes = [
  {
    path: 'main',
/*    canActivate: [LoginGuardService],*/
/*    component: GamesComponent*/
    loadChildren: '../main/main.module#MainModule'
  },
  {
    path: 'login',
/*    canActivate: [LoginGuardService],*/
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'login'
/*    pathMatch: 'full'*/
  }
/*  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class CoreRoutingModule { }

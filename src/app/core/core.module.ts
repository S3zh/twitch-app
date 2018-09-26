import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CoreRoutingModule } from './core-routing.module';
import {MatButtonModule, MatToolbarModule, MatInputModule} from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GamesComponent} from '../main/games/games.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
/*    GamesComponent,*/
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    RouterModule
  ]
})
export class CoreModule { }

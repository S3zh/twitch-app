import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import {MainModule} from './main/main.module';
import {SharedModule} from './shared/shared.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    MainModule,
    SharedModule,
    RouterModule.forRoot([])
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

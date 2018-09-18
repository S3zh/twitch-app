import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {SafePipe} from './safe.pipe';

import {MatButtonModule, MatToolbarModule, MatCardModule, MatInputModule} from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/core.module';
import {FormModule} from './form/form.module';

@NgModule({
  declarations: [
    AppComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CoreModule,
    FormModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

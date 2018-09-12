import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {StreamViewComponent} from './stream-view/stream-view.component';
import {GamesComponent} from './games/games.component';
import {StreamsComponent} from './streams/streams.component';
import {AppRoutingModule} from './app-routing.module';
import {SafePipe} from './safe.pipe';
import {SearchStreamComponent} from './search-stream/search-stream.component';
import {MatButtonModule, MatToolbarModule, MatCardModule, MatInputModule} from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';



@NgModule({
  declarations: [
    AppComponent,
    StreamViewComponent,
    GamesComponent,
    StreamsComponent,
    SafePipe,
    SearchStreamComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

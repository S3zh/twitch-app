import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { StreamViewComponent } from './stream-view/stream-view.component';
import { GamesComponent } from './games/games.component';
import { StreamsComponent } from './streams/streams.component';
import { SearchStreamComponent } from './search-stream/search-stream.component';
import { SafePipe } from './safe.pipe';
import { MatButtonModule, MatCardModule, MatInputModule, MatToolbarModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    StreamViewComponent,
    GamesComponent,
    StreamsComponent,
    SearchStreamComponent,
    SafePipe
  ]
})
export class MainModule {
}

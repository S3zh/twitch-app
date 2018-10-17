import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { GamesCardComponent } from './games-card/games-card.component';
import { MatCardModule} from '@angular/material';
import { RouterModule } from '@angular/router';
import { StreamCardComponent } from './stream-card/stream-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SafePipe } from './pipes/safe.pipe';

const COMPONENTS = [
  LoadingSpinnerComponent,
  GamesCardComponent,
  StreamCardComponent,
  SafePipe
];

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    RouterModule
  ],
  exports: COMPONENTS,
  declarations: COMPONENTS
})
export class SharedModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { GamesCardComponent } from './games-card/games-card.component';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatCardModule, MatDialogModule} from '@angular/material';
import { RouterModule } from '@angular/router';
import { StreamCardComponent } from './stream-card/stream-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SafePipe } from './pipes/safe.pipe';
import {ClipCardComponent} from './clip-card/clip-card.component';
import {ClipDisplayDialogComponent} from './clip-card/clip-display/clip-display-dialog.component';

const COMPONENTS = [
  LoadingSpinnerComponent,
  GamesCardComponent,
  StreamCardComponent,
  ClipCardComponent,
  ClipDisplayDialogComponent,
  SafePipe
];

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    RouterModule,
    MatDialogModule
  ],
  exports: COMPONENTS,
  entryComponents: [ClipDisplayDialogComponent],
  declarations: COMPONENTS
})
export class SharedModule {
}

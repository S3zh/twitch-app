import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const COMPONENTS = [
  LoadingSpinnerComponent
];

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: COMPONENTS,
  declarations: COMPONENTS
})
export class SharedModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import {StreamViewComponent} from './stream-view/stream-view.component';
import {GamesComponent} from './games/games.component';
import {StreamsComponent} from './streams/streams.component';
import {SearchStreamComponent} from './search-stream/search-stream.component';

@NgModule({
  imports: [
    CommonModule,
    FormRoutingModule
  ],
  declarations: [
    FormComponent,
    StreamViewComponent,
    GamesComponent,
    StreamsComponent,
    SearchStreamComponent
  ],
  exports: []
})
export class FormModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CoreRoutingModule } from './core-routing.module';
import {MatButtonModule, MatToolbarModule, MatInputModule} from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }

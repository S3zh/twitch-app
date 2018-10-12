import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ClipDisplayDialogComponent} from './clip-display/clip-display-dialog.component';

@Component({
  selector: 'app-clip-card',
  templateUrl: './clip-card.component.html',
  styleUrls: ['./clip-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClipCardComponent {

  @Input() img: string;
  @Input() title: string;
  @Input() views: string;
  @Input() url: string;

  constructor(public dialog: MatDialog) {
  }

  openDialog() {
    this.dialog.open(ClipDisplayDialogComponent, {
      hasBackdrop: true,
      data: {
        url: this.url
      }
    });
  }
}

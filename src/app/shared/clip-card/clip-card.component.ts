import {Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ClipDisplayDialogComponent} from './clip-display/clip-display-dialog.component';

@Component({
  selector: 'app-clip-card',
  templateUrl: './clip-card.component.html',
  styleUrls: ['./clip-card.component.css']
})
export class ClipCardComponent {

  @Input() img: string;
  @Input() game: string;
  @Input() title: string;
  @Input() views: string;
  @Input() channel_name: string;

  constructor(public dialog: MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(ClipDisplayDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

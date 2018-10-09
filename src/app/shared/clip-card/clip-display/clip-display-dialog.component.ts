import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-clip-display',
  templateUrl: './clip-display.component.html',
  styleUrls: ['./clip-display.component.css']
})
export class ClipDisplayDialogComponent {

  constructor(public thisDialogRef: MatDialogRef<ClipDisplayDialogComponent>) { }

}

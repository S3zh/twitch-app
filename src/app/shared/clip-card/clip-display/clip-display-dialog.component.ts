import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-clip-display',
  templateUrl: './clip-display.component.html',
  styleUrls: ['./clip-display.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClipDisplayDialogComponent {

  constructor(public thisDialogRef: MatDialogRef<ClipDisplayDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

}

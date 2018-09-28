import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-stream-card',
  templateUrl: './stream-card.component.html',
  styleUrls: ['./stream-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StreamCardComponent {

  @Input() name: string;
  @Input() viewers: number;
  @Input() src: string;

}

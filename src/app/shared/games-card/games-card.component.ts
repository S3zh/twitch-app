import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-games-card',
  templateUrl: './games-card.component.html',
  styleUrls: ['./games-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesCardComponent {

  @Input() name: string;
  @Input() viewers: number;
  @Input() src: string;

}

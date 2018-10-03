import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {StreamService} from '../../main/service/stream.service';

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

  constructor(private route: Router,
              private streamService: StreamService) {
  }

  openStream() {
    this.streamService.currentStream$.next(this.name);
    this.route.navigate([`/stream/${this.name}`]);
  }
}

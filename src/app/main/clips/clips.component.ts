import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ClipService} from '../service/clip.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Clip} from '../interfaces/clip';

@Component({
  selector: 'app-clips',
  templateUrl: './clips.component.html',
  styleUrls: ['./clips.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClipsComponent implements OnInit, OnDestroy {

  clips: Array<Clip>;
  private ngUnsubscribe$ = new Subject();

  constructor(private clipService: ClipService,
              private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.getTopClips();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }

  getTopClips() {
    this.clipService.getClips()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((answer) => {
        this.clips = answer;
        console.log(this.clips);
        this.cd.markForCheck();
      });
  }
}

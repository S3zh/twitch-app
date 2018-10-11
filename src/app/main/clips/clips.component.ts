import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ClipService} from '../service/clip.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Clip} from '../interfaces/clip';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-clips',
  templateUrl: './clips.component.html',
  styleUrls: ['./clips.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClipsComponent implements OnInit, OnDestroy {

  clips: Array<Clip>;
  isLoaded: boolean;
  private ngUnsubscribe$ = new Subject();

  constructor(private clipService: ClipService,
              private route: ActivatedRoute,
              private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.clipService.clipInit$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((channel_name) => {
        this.isLoaded = false;
        this.getTopClips(channel_name);
        this.cd.markForCheck();
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }

  getTopClips(channel_name: string) {
    this.clipService.getClips(channel_name)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((answer) => {
        this.clips = answer;
        this.isLoaded = true;
        this.cd.markForCheck();
      });
  }
}

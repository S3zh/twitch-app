import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ClipService} from '../service/clip.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Clip} from '../interfaces/clip';
import {ActivatedRoute} from '@angular/router';
import {ClipResponse} from '../interfaces/clip-response';

@Component({
  selector: 'app-clips',
  templateUrl: './clips.component.html',
  styleUrls: ['./clips.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClipsComponent implements OnInit, OnDestroy {

  clips: Array<Clip> = [];
  isLoaded: boolean;
  cursor = '';
  channel_name: string;
  private ngUnsubscribe$ = new Subject();

  constructor(private clipService: ClipService,
              private route: ActivatedRoute,
              private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.clipService.clipInit$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((channel_name) => {
        this.isLoaded = false;
        this.channel_name = channel_name;
        this.cursor = ''; // обнуляем, пришел новый канал (поменялся редирект)
        this.clips = []; // обнуляем, что бы после обновления канала не оставалось старых клипов.
        this.getTopClips(this.channel_name);
        this.cd.markForCheck();
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }

  onScroll() {
    this.getTopClips(this.channel_name);
  }

  getTopClips(channel_name: string) {
    this.clipService.getClips(channel_name, this.cursor)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((answer: ClipResponse) => {
        this.clips.push(...answer.clips);
        this.cursor = answer._cursor;
        this.isLoaded = true;
        this.cd.markForCheck();
      });
  }
}

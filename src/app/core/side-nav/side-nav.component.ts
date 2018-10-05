import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Stream} from '../../main/interfaces/stream';
import {SidebarService} from '../services/sidebar.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {FollowService} from '../../main/service/follow.service';
import {StreamService} from '../../main/service/stream.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavComponent implements OnInit, OnDestroy {

  followStreams: Array<Stream>;
  @Output() toggle = new EventEmitter<boolean>();
  private ngUnsubscribe$ = new Subject();

  constructor(private sidebarService: SidebarService,
              private followService: FollowService,
              private streamService: StreamService,
              private route: Router,
              private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.followService.followInit$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((state) => {
        if (state) {
          this.getFollowStreams();
        } else {
          this.followStreams = [];
        }
        this.cd.markForCheck();
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }

  getFollowStreams() {
    this.sidebarService.getFollowStreams()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((answer) => {
        this.followStreams = answer;
        this.cd.markForCheck();
      });
  }

  openStream(name: string) {
    this.streamService.currentStream$.next(name);
    this.route.navigate([`/stream/${name}`]);
    this.toggle.emit(false);
  }

  changeSidenav(state: boolean) {
    this.toggle.emit(state);
  }
}

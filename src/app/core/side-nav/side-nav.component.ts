import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Stream} from '../../main/interfaces/stream';
import {SidebarService} from '../services/sidebar.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {FollowService} from '../../main/service/follow.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavComponent implements OnInit, OnDestroy {

  followStreams: Array<Stream>;
  private ngUnsubscribe$ = new Subject();

  constructor(private sidebarService: SidebarService,
              private followService: FollowService) { }

  ngOnInit() {
    this.followService.followInit$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => {
        this.getFollowStreams();
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
      });
  }
}

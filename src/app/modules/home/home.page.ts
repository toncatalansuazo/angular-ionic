import { Component, OnInit } from '@angular/core';
import { Destroyer } from 'src/app/utils/Destroyer';
import { Alert, AlertResponse } from './alert/alert.model';
import { fromHomeActions, fromHomeReducers } from './store';
import { Router, NavigationEnd } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends Destroyer implements OnInit {
  alerts$: Observable<Alert[]>;

  constructor(
    private store: Store<fromHomeReducers.HomeState>,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.alerts$ = this.store.pipe(select(fromHomeReducers.getAlerts));
    this.subscribeToRoute();
  }

  private subscribeToRoute() {
    this.router.events.pipe(this.closeOnDestroy$()).subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.store.dispatch(fromHomeActions.findAlerts());
      }
    });
  }

  onDetails() {
    // @TODO
    console.log('show details');
  }
}

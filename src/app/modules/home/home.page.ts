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

  // private getAlerts(): Alert[] {
  //   return [
  //     new Alert(
  //       0,
  //       'Ordenes Pendientes',
  //       'Que se deben entregar',
  //       0,
  //       'danger',
  //       'orders/pending'
  //     ),
  //     new Alert(
  //       1,
  //       'Ordenes Sin Enviar',
  //       'Que se deben enviar al transporte',
  //       0,
  //       'medium',
  //       'orders/prepared'
  //     ),
  //     new Alert(
  //       2,
  //       'Productos',
  //       'Que estan registrados',
  //       0,
  //       'primary',
  //       'products'
  //     ),
  //     new Alert(
  //       3,
  //       'Productos Sin Stock',
  //       'Que no se estan mostrando',
  //       0,
  //       'warning',
  //       'products/no-stock'
  //     ),
  //     new Alert(4, 'Post Publicados', 'Post en blog', 0, 'dark', ''),
  //   ];
  // }

  // private loadAlerts() {
    // this.subscribeToRoute.console.log('fetch');
    // this.alertServ.getAlerts()
    // .pipe(this.closeOnDestroy$())
    // .subscribe((alertsResponse: AlertResponse) => {
    //   console.log(alertsResponse);
    //   if (alertsResponse.success) {
    //     const alerts: Alert[] = alertsResponse.data;
    //     for (let i = 0; i < alerts.length; i++) {
    //       this.alerts[i].quantity = alerts[i].quantity;
    //     }
    //   }
    // });
  // }
}

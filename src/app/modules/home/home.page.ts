import { Component, OnInit } from '@angular/core';
import { Destroyer } from 'src/app/utils/Destroyer';
import { Alert, AlertResponse } from './alert/alert.model';
import { AlertService } from 'src/app/core/http/task/alert/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends Destroyer implements OnInit {

  public alerts: Alert[];

  constructor(private alertServ: AlertService) {
    super();
  }

  ngOnInit(): void {
    console.log('init');
    this.alerts = this.getAlerts();
    this.fetchAlerts();
  }

  onDetails() {
    // @TODO
    console.log('show details');
  }

  private getAlerts(): Alert[] {
    return [
      new Alert(0 , 'Ordenes Pendientes',  'Que se deben entregar',  0,  'danger', 'orders/pending'),
      new Alert(1 , 'Ordenes Sin Enviar',  'Que se deben enviar al transporte',  0,  'medium', 'orders/prepared'),
      new Alert(2 , 'Productos',  'Que estan registrados',  0,  'primary', 'products'),
      new Alert(3 , 'Productos Sin Stock',  'Que no se estan mostrando',  0,  'warning', 'products/no-stock'),
      new Alert(4 , 'Post Publicados',  'Post en blog',  0,  'dark', '')
    ];
  }

  private fetchAlerts() {
    console.log('fetch');
    this.alertServ.getAlerts()
    .pipe(this.closeOnDestroy$())
    .subscribe((alertsResponse: AlertResponse) => {
      console.log(alertsResponse);
      if (alertsResponse.success) {
        const alerts: Alert[] = alertsResponse.data;
        for (let i = 0; i < alerts.length; i++) {
          this.alerts[i].quantity = alerts[i].quantity;
        }
      }
    });
  }

}

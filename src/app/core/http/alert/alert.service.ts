import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alert, AlertResponse } from 'src/app/modules/home/alert/alert.model';
import { ConfigurationEndpoint } from 'src/app/configuration/configuration-endpoint';
import { map } from 'rxjs/operators';
import { OrderRoute } from 'src/app/modules/orders/OrderRoute';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    get url(): string {
        return ConfigurationEndpoint.getAlertEndpoint();
    }
    constructor(private http: HttpClient) {}

    getAlerts(): Observable<Alert[]> {
        return this.http.get(this.url).pipe(
            map((json: AlertResponse) => this.toAlerts(json))
        );
    }

    private toAlerts(json: AlertResponse): Alert[] {
      const alerts: Alert[] = [
        new Alert(
          0,
          'Ordenes Pendientes',
          'Que se deben entregar',
          0,
          'danger',
          `${OrderRoute.ORDERS}/${OrderRoute.PENDING}`
        ),
        new Alert(
          1,
          'Ordenes Sin Enviar',
          'Que se deben enviar al transporte',
          0,
          'medium',
          `${OrderRoute.ORDERS}${OrderRoute.TO_DELIVER}`
        ),
        new Alert(
          2,
          'Productos',
          'Que estan registrados',
          0,
          'primary',
          'products'
        ),
        new Alert(
          3,
          'Productos Sin Stock',
          'Que no se estan mostrando',
          0,
          'warning',
          'products/out-stock'
        ),
        new Alert(4, 'Post Publicados', 'Post en blog', 0, 'dark', ''),
      ];
      return alerts.map(alert => {
        const quantity = json.data.find(al => al.id === alert.id).quantity;
        alert.quantity = quantity;
        return alert;
      });
    }
}

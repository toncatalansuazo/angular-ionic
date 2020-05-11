import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alert, AlertResponse } from 'src/app/modules/home/alert/alert.model';
import { ConfigurationEndpoint } from 'src/app/configuration/configuration-endpoint';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    get url(): string {
        return ConfigurationEndpoint.getAlertEndpoint();
    }
    constructor(private http: HttpClient) {}

    getAlerts(): Observable<AlertResponse> {
        return this.http.get<AlertResponse>(this.url);
    }
}

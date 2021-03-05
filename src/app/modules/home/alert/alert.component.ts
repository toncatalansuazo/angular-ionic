import { Component, OnInit, Input } from '@angular/core';
import { Alert } from './alert.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input() alert: Alert;
  constructor(private route: Router) { }

  navigate(url: string): void {
    this.route.navigate([url]);
  }
}

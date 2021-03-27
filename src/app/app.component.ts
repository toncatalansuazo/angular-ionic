import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './core/authentication/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
      color: 'primary'
    },
    {
      title: 'Ordenes Completadas Detalle',
      url: '/orders/completed',
      icon: 'checkmark',
      color: 'success'
    },
    {
      title: 'Ordenes Pendientes Detalle',
      url: '/orders/pending',
      icon: 'alert',
      color: 'danger'
    },
    {
      title: 'Por Enviar Detalle',
      url: '/orders/to-deliver',
      icon: 'send',
      color: 'warning'
    },
    {
      title: 'Productos Detalle',
      url: '/products',
      icon: 'nutrition',
      color: 'tertiary'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private route: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout() {
    this.authService.logout();
    this.route.navigate(['login']);
  }
}

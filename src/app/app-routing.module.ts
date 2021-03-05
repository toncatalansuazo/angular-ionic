import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {path: '', canActivate: [AuthGuard], pathMatch: 'prefix', children: [
    {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full'
    },
    {
      path: 'home',
      loadChildren: () => import('./modules/home/home.module').then(m => m.HomePageModule)
    },
    {
      path: 'orders',
      loadChildren: () => import('./modules/orders/orders.module').then(m => m.OrdersModule)
    },
    {
      path: 'products',
      loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule)
    }
  ]},
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

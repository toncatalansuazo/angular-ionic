import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { orderReducer } from './store/order.reducer';
import { CompletedOrdersComponent } from './completed/completed.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PendingComponent } from './pending/pending.component';
import { ToDeliverComponent } from './to-deliver/to-deliver.component';
import { DetailComponent as DetailOrderComponent } from './detail/detail.component';
import { OrderRoute } from './OrderRoute';
import { SharedModule } from 'src/app/shared/shared.module';
import { PivotPipe } from 'src/app/shared/pipes/pivot.pipe';
import { fromOrderReducer, fromOrderEffects } from './store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    NgxDatatableModule,
    RouterModule.forChild([
      {
        path: OrderRoute.COMPLETE,
        component: CompletedOrdersComponent
      },
      {
        path: OrderRoute.PENDING,
        component: PendingComponent
      }
      ,
      {
        path: OrderRoute.TO_DELIVER,
        component: ToDeliverComponent
      },
      {
        path: OrderRoute.DETAIL,
        component: DetailOrderComponent
      }
    ]),
    StoreModule.forFeature(fromOrderReducer.featureKey, orderReducer),
    EffectsModule.forFeature([fromOrderEffects.OrderEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  declarations: [CompletedOrdersComponent, PendingComponent, ToDeliverComponent,
    DetailOrderComponent, PivotPipe]
})
export class OrdersModule {}

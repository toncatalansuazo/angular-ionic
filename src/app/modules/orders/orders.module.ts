import { NgModule } from '@angular/core';
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
import { fromOrderReducer, fromOrderEffects } from './store';
import { EffectsModule } from '@ngrx/effects';
import { ProductModalService } from 'src/app/shared/modals/product-modal/product-modal.service';

@NgModule({
  declarations: [
    CompletedOrdersComponent, 
    PendingComponent, 
    ToDeliverComponent,
    DetailOrderComponent
  ],
  imports: [
    SharedModule,
    NgxDatatableModule,
    RouterModule.forChild([
      {
        path: OrderRoute.COMPLETED,
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
        path: `${OrderRoute.DETAIL}/:id`,
        component: DetailOrderComponent
      }
    ]),
    StoreModule.forFeature(fromOrderReducer.featureKey, orderReducer),
    EffectsModule.forFeature([fromOrderEffects.OrderEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  providers: [ProductModalService]
})
export class OrdersModule {}

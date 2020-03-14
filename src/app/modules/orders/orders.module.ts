import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HeaderTemplateModule } from 'src/app/shared/ui/header-template/header-template.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { orderReducer } from './store/order.reducer';
import { CompletedOrdersComponent } from './completed/completed.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PendingComponent } from './pending/pending.component';
import { ToDeliverComponent } from './to-deliver/to-deliver.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderTemplateModule,
    NgxDatatableModule,
    RouterModule.forChild([
      {
        path: 'completed',
        component: CompletedOrdersComponent
      },
      {
        path: 'pending',
        component: PendingComponent
      }
      ,
      {
        path: 'to-deliver',
        component: ToDeliverComponent
      },
      {
        path: 'missing-transport-deliver',
        component: CompletedOrdersComponent
      }
    ]),
    StoreModule.forFeature('orders', orderReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  declarations: [CompletedOrdersComponent, PendingComponent, ToDeliverComponent]
})
export class OrdersModule {}

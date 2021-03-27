import { NgModule } from '@angular/core';
import { ProductComponent } from './product.component';
import { StoreModule } from '@ngrx/store';
import { fromProductReducer } from './store'
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EffectsModule } from '@ngrx/effects';
import * as fromProductsEffects from './store/product.effect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductModalService } from 'src/app/shared/modals/product-modal/product-modal.service';

@NgModule({
  declarations: [ProductComponent],
  exports: [ProductComponent],
  imports: [
    SharedModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([fromProductsEffects.ProductEffects]),
    RouterModule.forChild([{
      path: '',
      component: ProductComponent
    }, {
      path: 'out-stock',
      component: ProductComponent
    }]),
    StoreModule.forFeature(fromProductReducer.featureKey, fromProductReducer.productReducer)
  ],
  providers: [ProductModalService]

})
export class ProductModule { }

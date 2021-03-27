import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { from, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Product } from 'src/app/core/http/product/product.model';
import { ProductModalType } from 'src/app/model/ProductModalType';
import { ProductModalComponent } from 'src/app/shared/modals/product-modal/product-modal.component';
import { ProductModalService } from 'src/app/shared/modals/product-modal/product-modal.service';
import { fromUiActions, fromUiReducers, fromUiSelectors } from 'src/app/shared/store';
import { fromProductSelector } from './store';
import * as fromProductAction from './store/product.action';
import * as fromProductReducer from './store/product.reducer';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  currentProductsInList$: Observable<Product[]>;
  products$: Observable<Product[]>;
  columMode: any;
  columns: ({ name: string; prop: string; maxWidth: number; } | { name: string; prop: string; maxWidth?: undefined; })[];
  isLoading$: Observable<boolean>;

  constructor(private store: Store<fromProductReducer.State>,
    private router: Router,
    private productModal: ProductModalService,
    private modalController: ModalController
    ) { }

  ngOnInit() {
    this.setTableConfiguration();
    this.store.dispatch(fromProductAction.getProducts());
    this.listenProductByRoute();
    this.isLoading$ = this.store.select(fromUiSelectors.getIsLoadingProgressBar);
  }

  onFilterList($event: any) {
    const val = $event.srcElement.value.toLocaleLowerCase();
    if(val.length > 2) {
      this.currentProductsInList$ = this.products$.pipe(
        map((products: Product[]) => products.filter((product: Product) => product.name.toLocaleLowerCase().indexOf(val) !== -1))
      );
    } else if(val.length === 0) {
      this.currentProductsInList$ = this.products$;
    }
  }

  listenProductByRoute() {
    // todo listen page on load and change selector
    const outStock = this.router.url.indexOf('out-stock') !== -1;
    if (outStock) {
      this.products$ = this.store.select(fromProductSelector.getProductsOutStock);
    } else {
      this.products$ = this.store.select(fromProductSelector.getProducts);
    }
    this.currentProductsInList$ = this.products$;
  }

  onActivate(event: {type: string, row: Product}) {
    if (event.type === 'click') {
      this.showProductModal({ product: event.row, mode: ProductModalType.DETAIL });
      // this.productModal.showProductModal({ product: event.row, mode: ProductModalType.DETAIL });
        // this.store.dispatch(fromUiActions.showProductInModal({ product: event.row, mode: ProductModalType.DETAIL }))
    }
  }
  async showProductModal(data: { product: Product, mode: ProductModalType }) {
    const modal = await this.modalController.create({
      component: ProductModalComponent, 
      componentProps: data
    });
    return await modal.present();
  }

  setTableConfiguration() {
    this.columMode = ColumnMode.force;
    this.columns = [
        { name: 'Nombre', prop: 'name', maxWidth: 100 },
        { name: 'Precio' , prop: 'price' },
        { name: 'Unidad', prop: 'unit' },
        { name: 'Cantidad', prop: 'stock' }
    ];
  }
}

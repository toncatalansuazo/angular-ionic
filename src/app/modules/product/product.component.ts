import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { from, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Product } from 'src/app/core/http/product/product.model';
import { ProductModalType } from 'src/app/model/ProductModalType';
import { fromUiActions } from 'src/app/shared/store';
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
  
  constructor(private store: Store<fromProductReducer.State>,
    private router: Router) { }

  ngOnInit() {
    this.setTableConfiguration();
    this.store.dispatch(fromProductAction.getProducts());
    this.listenProductByRoute();
  }

  onFilterList($event) {
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

  onActivate(event) {
    if (event.type === 'click') {
        this.store.dispatch(fromUiActions.showProductInModal({ product: event.row, mode: ProductModalType.DETAIL }))
    }
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

import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/http/product/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product>;
  columMode: ColumnMode;
  columns: ({ name: string; prop: string; maxWidth: number; } | { name: string; prop: string; maxWidth?: undefined; })[];
  constructor() { }

  ngOnInit() {}

  setTableConfiguration() {
    this.columMode = ColumnMode.force;
    this.columns = [
        { name: 'Id', prop: 'id', maxWidth: 100 },
        { name: 'Nombre', prop: 'name', maxWidth: 100 },
        { name: 'Unidad', prop: 'unit' },
        { name: 'Precio' , prop: 'price' },
        { name: 'Cantidad' , prop: 'quantity' }
    ];
}

}

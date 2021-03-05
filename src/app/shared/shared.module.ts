import { NgModule } from '@angular/core';
import { HeaderTemplateComponent } from './ui/header-template/header-template.component';
import { ItemComponent } from './ui/item/item.component';
import { IonicModule } from '@ionic/angular';
import { PivotPipe } from './pipes/pivot.pipe';
import { ProductModalComponent } from './modal/product-modal/product-modal.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    HeaderTemplateComponent,
    ItemComponent,
    PivotPipe,
    ProductModalComponent,
    CommonModule
  ],
  declarations: [
    HeaderTemplateComponent,
    ItemComponent,
    PivotPipe,
    ProductModalComponent
  ],
  providers: []
})
export class SharedModule {
  constructor() {}
}

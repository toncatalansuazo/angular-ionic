import { NgModule } from '@angular/core';
import { HeaderTemplateComponent } from './ui/header-template/header-template.component';
import { ItemComponent } from './ui/item/item.component';
import { IonicModule } from '@ionic/angular';
import { PivotPipe } from './pipes/pivot.pipe';
import { ProductModalComponent } from './modal/product-modal/product-modal.component';
import { CommonModule } from '@angular/common';
import { DragDropDirective } from './decorators/drag-drop.directive';
import { ProductReadyDirective } from './decorators/product-ready/product-ready.directive';

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
    CommonModule,
    ProductReadyDirective
  ],
  declarations: [
    HeaderTemplateComponent,
    ItemComponent,
    PivotPipe,
    ProductModalComponent,
    DragDropDirective,
    ProductReadyDirective
  ],
  providers: []
})
export class SharedModule {
  constructor() {}
}

import { NgModule } from '@angular/core';
import { HeaderTemplateComponent } from './ui/header-template/header-template.component';
import { ItemComponent } from './ui/item/item.component';
import { IonicModule } from '@ionic/angular';
import { PivotPipe } from './pipes/pivot.pipe';
import { StoreModule } from '@ngrx/store';
import { fromUiReducers } from './store';
@NgModule({
  imports: [
    // StoreModule.forFeature(fromUiReducers.featureKey, fromUiReducers.uiReducer),
    IonicModule
  ],
  exports: [HeaderTemplateComponent, ItemComponent],
  declarations: [HeaderTemplateComponent, ItemComponent],
  providers: []
})
export class SharedModule {
  constructor() {}
}

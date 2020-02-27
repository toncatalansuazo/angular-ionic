import { NgModule } from '@angular/core';
import { HeaderTemplateComponent } from './ui/header-template/header-template.component';

@NgModule({
  imports: [
    HeaderTemplateComponent
  ],
  exports: [HeaderTemplateComponent],
  declarations: [],
  providers: []
})
export class SharedModule {
  constructor() {}
}

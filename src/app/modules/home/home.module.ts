import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { homeReducer } from './store/home.reducers';
import { HomePage } from './home.page';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AlertComponent } from './alert/alert.component';
import { SharedModule } from 'src/app/shared/shared.module';
import * as fromHomeReducer from './store/home.reducers';
import { EffectsModule } from '@ngrx/effects';
import * as fromHomeEffects from './store/home.effects';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    StoreModule.forFeature(fromHomeReducer.featureKey, homeReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    EffectsModule.forFeature([fromHomeEffects.HomeEffects])
  ],
  declarations: [HomePage, AlertComponent]
})
export class HomePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CustomerEffects } from './customer.effects';
import { customerFeatureKey, reducer } from './customer.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(customerFeatureKey, reducer),
    EffectsModule.forFeature([CustomerEffects])
  ]
})
export class DataCustomerModule {}

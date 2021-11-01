import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CustomerEffects } from './customer.effects';
import { customerFeatureKey, reducer } from './customer.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(customerFeatureKey, reducer),
    EffectsModule.forFeature([CustomerEffects]),
    MatSnackBarModule,
  ],
})
export class CustomerDataModule {}

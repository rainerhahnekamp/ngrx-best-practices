import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Customer } from '../customer';
import { customerFeatureKey, State } from './customer.reducer';

const selectCustomerState = createFeatureSelector<State>(customerFeatureKey);

const selectAll = createSelector(
  selectCustomerState,
  (state) => state.customers
);

const selectById = (id: number) =>
  createSelector(selectAll, (state: Customer[]) =>
    state.find((p) => p.id === id)
  );

export const fromCustomer = {
  selectAll,
  selectById,
};

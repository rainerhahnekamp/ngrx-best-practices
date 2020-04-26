import { createFeatureSelector, createSelector } from '@ngrx/store';
import { customerFeatureKey, State } from './customer.reducer';
import { Customer } from '@eternal/domain/customer';

const selectCustomerState = createFeatureSelector<State>(customerFeatureKey);

const selectAll = createSelector(selectCustomerState, state => state.customers);

const selectById = createSelector(selectAll, (state: Customer[], id: number) =>
  state.find(p => p.id === id)
);

const isLoaded = createSelector(selectCustomerState, state => state.isLoaded);

const selectContext = createSelector(
  selectCustomerState,
  state => state.context
);

export const fromCustomer = {
  selectAll,
  selectById,
  isLoaded,
  selectContext
};

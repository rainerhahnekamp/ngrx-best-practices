import { createFeatureSelector, createSelector } from '@ngrx/store';
import { customerFeatureKey, State } from './customer.reducer';
import { Customer } from '../customer';

const selectCustomerState = createFeatureSelector<State>(customerFeatureKey);

const selectAll = createSelector(selectCustomerState, state => state.customers);

const selectById = createSelector(selectAll, (state: Customer[], id: number) =>
  state.find(p => p.id === id)
);

export const fromCustomer = {
  selectAll,
  selectById
};

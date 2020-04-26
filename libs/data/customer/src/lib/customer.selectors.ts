import { createFeatureSelector, createSelector } from '@ngrx/store';
import { customerFeatureKey, State } from './customer.reducer';
import { Customer } from '@eternal/domain/customer';

const selectCustomerState = createFeatureSelector<State>(customerFeatureKey);

const selectCurrent = createSelector(selectCustomerState, state =>
  state.currentCustomerIds.map(id => state.totalCustomers[id])
);

const selectAll = createSelector(
  selectCustomerState,
  state => state.totalCustomers
);

const selectById = createSelector(
  selectAll,
  (state: { [id: string]: Customer }, id: number) => state[id]
);

const isLoaded = createSelector(selectCustomerState, state => state.isLoaded);

const selectContext = createSelector(
  selectCustomerState,
  state => state.context
);

export const fromCustomer = {
  selectCurrent,
  selectById,
  selectAll,
  isLoaded,
  selectContext
};

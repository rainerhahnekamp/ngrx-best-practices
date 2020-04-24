import { createFeatureSelector, createSelector } from '@ngrx/store';
import { customerFeatureKey, State, LoadStatus } from './customer.reducer';
import { Customer } from '@eternal/domain/customer';

const selectCustomerState = createFeatureSelector<State>(customerFeatureKey);

const selectAll = createSelector(selectCustomerState, state => state.customers);

const selectById = createSelector(selectAll, (state: Customer[], id: number) =>
  state.find(p => p.id === id)
);

const selectLoadStatus = createSelector(
  selectCustomerState,
  state => state.loadStatus
);

const isLoaded = createSelector(
  selectLoadStatus,
  loadStatus => loadStatus === LoadStatus.LOADED
);

export const fromCustomer = {
  selectAll,
  selectById,
  selectLoadStatus,
  isLoaded
};

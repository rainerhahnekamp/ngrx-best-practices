import { createFeatureSelector, createSelector } from '@ngrx/store';
import { customerFeatureKey, State, LoadStatus } from './customer.reducer';
import { Customer } from '../customer';

const selectCustomerState = createFeatureSelector<State>(customerFeatureKey);

const selectAll = createSelector(
  selectCustomerState,
  (state) => state.customers
);

const selectById = (id: number) =>
  createSelector(selectAll, (state: Customer[]) =>
    state.find((p) => p.id === id)
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

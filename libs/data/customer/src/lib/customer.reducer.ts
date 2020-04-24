import { createReducer, Action, on } from '@ngrx/store';
import { CustomerActions } from './customer.actions';
import { Customer } from '@eternal/domain/customer';

export const customerFeatureKey = 'Customer';

export enum LoadStatus {
  NOT_LOADED,
  LOADING,
  LOADED
}

export interface State {
  loadStatus: LoadStatus;
  customers: Customer[];
}

export interface CustomerAppState {
  [customerFeatureKey]: State;
}

export const initialState: State = {
  loadStatus: LoadStatus.NOT_LOADED,
  customers: []
};

const CustomerReducer = createReducer<State>(
  initialState,
  on(CustomerActions.load, state => ({
    ...state,
    loadStatus: LoadStatus.LOADING
  })),
  on(CustomerActions.loaded, (state, { customers }) => ({
    ...state,
    loadStatus: LoadStatus.LOADED,
    customers
  })),
  on(CustomerActions.added, (state, { customers }) => ({
    ...state,
    customers
  })),
  on(CustomerActions.updated, (state, { customers }) => ({
    ...state,
    customers
  })),
  on(CustomerActions.removed, (state, { customers }) => ({
    ...state,
    customers
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return CustomerReducer(state, action);
}

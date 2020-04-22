import { Customer } from '../customer';
import { createReducer, Action, on } from '@ngrx/store';
import { CustomerActions } from './customer.actions';

export const customerFeatureKey = 'Customer';

export interface State {
  customers: Customer[];
}

export interface CustomerAppState {
  [customerFeatureKey]: State;
}

export const initialState: State = {
  customers: []
};

const CustomerReducer = createReducer<State>(
  initialState,
  on(CustomerActions.loaded, (state, { customers }) => ({
    ...state,
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

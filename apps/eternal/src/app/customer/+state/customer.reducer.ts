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
  on(CustomerActions.added, (state, { customer }) => ({
    ...state,
    customers: [...state.customers, customer]
  })),
  on(CustomerActions.updated, (state, { customer }) => ({
    ...state,
    customers: [...state.customers.filter(p => p.id !== customer.id), customer]
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return CustomerReducer(state, action);
}

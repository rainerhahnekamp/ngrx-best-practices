import { createReducer, Action, on } from '@ngrx/store';
import { CustomerActions, Context } from './customer.actions';
import { Customer } from '@eternal/domain/customer';

export const customerFeatureKey = 'Customer';

export interface State {
  isLoaded: boolean;
  context: Context;
  customers: Customer[];
}

export interface CustomerAppState {
  [customerFeatureKey]: State;
}

export const initialState: State = {
  isLoaded: false,
  context: null,
  customers: []
};

const CustomerReducer = createReducer<State>(
  initialState,
  on(CustomerActions.load, (state, { context }) => ({
    ...state,
    isLoaded: false,
    context
  })),
  on(CustomerActions.loaded, (state, { customers }) => ({
    ...state,
    isLoaded: true,
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

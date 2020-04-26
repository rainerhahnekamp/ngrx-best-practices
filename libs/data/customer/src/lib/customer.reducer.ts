import { createReducer, Action, on } from '@ngrx/store';
import { CustomerActions, Context } from './customer.actions';
import { Customer } from '@eternal/domain/customer';
import { fromPairs } from 'lodash';

export const customerFeatureKey = 'Customer';

export interface State {
  isLoaded: boolean;
  context: Context;
  currentCustomerIds: number[];
  totalCustomers: { [id: string]: Customer };
}

export interface CustomerAppState {
  [customerFeatureKey]: State;
}

export const initialState: State = {
  isLoaded: false,
  context: null,
  currentCustomerIds: [],
  totalCustomers: {}
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
    currentCustomerIds: customers.map(customer => customer.id),
    totalCustomers: {
      ...state.totalCustomers,
      ...fromPairs(
        customers
          .filter(({ id }) => !state.totalCustomers[id])
          .map(customer => [customer.id, customer])
      )
    }
  })),
  on(CustomerActions.loadedById, (state, { customer }) => ({
    ...state,
    totalCustomers: {
      ...state.totalCustomers,
      ...fromPairs([[customer.id, customer]])
    }
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

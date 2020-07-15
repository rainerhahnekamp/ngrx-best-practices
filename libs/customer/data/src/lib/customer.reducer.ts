import { createReducer, Action, on } from '@ngrx/store';
import { fromPairs, omit } from 'lodash';
import { CustomerActions, Context } from './customer.actions';
import { Customer } from '@eternal/customer/domain';
import * as hash from 'object-hash';

export const customerFeatureKey = 'Customer';

export interface State {
  isLoaded: boolean;
  context: Context;
  currentCustomerIds: number[];
  totalCustomers: { [id: string]: Customer };
  cache: { [contextHash: string]: number[] };
}

export interface CustomerAppState {
  [customerFeatureKey]: State;
}

export const initialState: State = {
  isLoaded: false,
  context: null,
  currentCustomerIds: [],
  totalCustomers: {},
  cache: {}
};

const CustomerReducer = createReducer<State>(
  initialState,
  on(CustomerActions.get, (state, { context }) => {
    console.log(context);
    const cachedCustomerIds = state.cache[hash(context)];
    if (cachedCustomerIds) {
      return {
        ...state,
        context,
        currentCustomerIds: cachedCustomerIds
      };
    }
    return state;
  }),
  on(CustomerActions.load, (state, { context }) => ({
    ...state,
    isLoaded: false,
    context
  })),
  on(CustomerActions.loaded, (state, { context, customers }) => {
    return {
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
      },
      cache: {
        ...state.cache,
        ...fromPairs([[hash(context), customers.map(customer => customer.id)]])
      }
    };
  }),
  on(CustomerActions.loadedById, (state, { customer }) => ({
    ...state,
    totalCustomers: {
      ...state.totalCustomers,
      ...fromPairs([[customer.id, customer]])
    }
  })),
  on(CustomerActions.added, state => ({
    ...state,
    context: null
  })),
  on(CustomerActions.updated, (state, { customer }) => ({
    ...state,
    context: null,
    totalCustomers: fromPairs(
      Object.entries(state.totalCustomers).map(([id, c]) =>
        c.id === customer.id ? [id, customer] : [id, c]
      )
    )
  })),
  on(CustomerActions.removed, (state, { customer }) => ({
    ...state,
    context: null,
    totalCustomers: omit(state.totalCustomers, '' + customer.id)
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return CustomerReducer(state, action);
}

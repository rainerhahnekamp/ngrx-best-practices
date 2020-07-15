import { createAction, props } from '@ngrx/store';
import { Customer } from '@eternal/customer/domain';
import { UrlTree } from '@angular/router';

export interface Context {
  page: number;
  name?: string;
  country?: string;
}

const get = createAction('[Customer] Get', props<{ context: Context }>());
const load = createAction('[Customer] Load', props<{ context: Context }>());
const loaded = createAction(
  '[Customer] Loaded',
  props<{ context: Context; customers: Customer[] }>()
);

const getById = createAction('[Customer] Get By Id', props<{ id: number }>());
const loadById = createAction('[Customer] Load By Id', props<{ id: number }>());
const loadedById = createAction(
  '[Customer] Loaded By Id',
  props<{ customer: Customer }>()
);
const add = createAction(
  '[Customer] Add',
  props<{
    customer: Customer;
    redirectSupplier: (customerId: number) => UrlTree;
  }>()
);
const added = createAction(
  '[Customer] Added',
  props<{
    redirect: UrlTree;
  }>()
);

const update = createAction(
  '[Customer] Update',
  props<{ customer: Customer; redirect: UrlTree }>()
);
const updated = createAction(
  '[Customer] Updated',
  props<{ customer: Customer; redirect: UrlTree }>()
);

const remove = createAction(
  '[Customer] Remove',
  props<{ customer: Customer; redirect: UrlTree }>()
);
const removed = createAction(
  '[CUSTOMER] Removed',
  props<{ customer: Customer; redirect: UrlTree }>()
);

export const CustomerActions = {
  get,
  load,
  loaded,
  getById,
  loadById,
  loadedById,
  add,
  added,
  update,
  updated,
  remove,
  removed
};

export const PublicCustomerActions = {
  get,
  loadById,
  add,
  update,
  remove
};

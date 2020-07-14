import { createAction, props } from '@ngrx/store';
import { Customer } from '@eternal/customer/domain';
import { UrlTree } from '@angular/router';

const get = createAction('[Customer] Get');
const load = createAction('[Customer] Load');
const loaded = createAction(
  '[Customer] Loaded',
  props<{ customers: Customer[] }>()
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
    customers: Customer[];
    redirect: UrlTree;
  }>()
);

const update = createAction(
  '[Customer] Update',
  props<{ customer: Customer; redirect: UrlTree }>()
);
const updated = createAction(
  '[Customer] Updated',
  props<{ customers: Customer[]; redirect: UrlTree }>()
);

const remove = createAction(
  '[Customer] Remove',
  props<{ customer: Customer; redirect: UrlTree }>()
);
const removed = createAction(
  '[CUSTOMER] Removed',
  props<{ customers: Customer[]; redirect: UrlTree }>()
);

export const CustomerActions = {
  get,
  load,
  loaded,
  add,
  added,
  update,
  updated,
  remove,
  removed
};

export const PublicCustomerActions = {
  get,
  add,
  update,
  remove
};

import { createAction, props } from '@ngrx/store';
import { Customer } from '@eternal/domain/customer';

const get = createAction('[Customer] Get');
const load = createAction('[Customer] Load');
const loaded = createAction(
  '[Customer] Loaded',
  props<{ customers: Customer[] }>()
);

const add = createAction('[Customer] Add', props<{ customer: Customer }>());
const added = createAction(
  '[Customer] Added',
  props<{ customers: Customer[] }>()
);

const update = createAction(
  '[Customer] Update',
  props<{ customer: Customer }>()
);
const updated = createAction(
  '[Customer] Updated',
  props<{ customers: Customer[] }>()
);

const remove = createAction(
  '[Customer] Remove',
  props<{ customer: Customer }>()
);
const removed = createAction(
  '[CUSTOMER] Removed',
  props<{ customers: Customer[] }>()
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

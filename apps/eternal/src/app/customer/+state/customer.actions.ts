import { createAction, props } from '@ngrx/store';
import { Customer } from '../customer';

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
  load,
  loaded,
  add,
  added,
  update,
  updated,
  remove,
  removed
};

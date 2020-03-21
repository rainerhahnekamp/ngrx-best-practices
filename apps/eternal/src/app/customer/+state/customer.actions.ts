import { createAction, props } from '@ngrx/store';
import { Customer } from '../customer';

const load = createAction('[Customer] Load');
const loaded = createAction(
  '[Customer] Loaded',
  props<{ customers: Customer[] }>()
);

const add = createAction('[Customer] Add', props<{ customer: Customer }>());
const added = createAction('[Customer] Added', props<{ customer: Customer }>());

const update = createAction(
  '[Customer] Update',
  props<{ customer: Customer }>()
);
const updated = createAction(
  '[Customer] Updated',
  props<{ customer: Customer }>()
);

export const CustomerActions = {
  load,
  loaded,
  add,
  added,
  update,
  updated
};

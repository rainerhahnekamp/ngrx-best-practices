import { createAction, props } from '@ngrx/store';
import { Customer } from '@eternal/customer/domain';

export interface Context {
  page: number;
  name?: string;
  country?: string;
}

const get = createAction('[Customer] Get', props<{ context: Context }>());
const load = createAction('[Customer] Load', props<{ context: Context }>());
const loaded = createAction(
  '[Customer] Loaded',
  props<{ customers: Customer[] }>()
);

const getById = createAction('[Customer] Get By Id', props<{ id: number }>());
const loadById = createAction('[Customer] Load By Id', props<{ id: number }>());
const loadedById = createAction(
  '[Customer] Loaded By Id',
  props<{ customer: Customer }>()
);

const add = createAction('[Customer] Add', props<{ customer: Customer }>());
const added = createAction('[Customer] Added');

const update = createAction(
  '[Customer] Update',
  props<{ customer: Customer }>()
);
const updated = createAction(
  '[Customer] Updated',
  props<{ customer: Customer }>()
);

const remove = createAction(
  '[Customer] Remove',
  props<{ customer: Customer }>()
);
const removed = createAction(
  '[CUSTOMER] Removed',
  props<{ customer: Customer }>()
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

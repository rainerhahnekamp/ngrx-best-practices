import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Customer } from '../customer';
import { Store } from '@ngrx/store';
import { CustomerAppState } from '../+state/customer.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerActions } from '../+state/customer.actions';
import { fromCustomer } from '../+state/customer.selectors';
import { filter, first } from 'rxjs/operators';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html'
})
export class CustomerComponent implements OnInit {
  formGroup: FormGroup;
  customers$: Observable<Customer>;

  constructor(
    private store: Store<CustomerAppState>,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [0],
      firstname: ['', Validators.required],
      name: ['', Validators.required],
      country: [''],
      birthdate: []
    });
    this.store.dispatch(CustomerActions.load());
    this.store
      .select(fromCustomer.selectById, Number(this.route.snapshot.params.id))
      .pipe(
        filter(customer => !!customer),
        first()
      )
      .subscribe(customer => this.formGroup.setValue(customer));
  }

  submit() {
    if (this.formGroup.valid) {
      const customer = this.formGroup.value as Customer;
      if (customer.id) {
        this.store.dispatch(CustomerActions.update({ customer }));
      } else {
        this.store.dispatch(CustomerActions.add({ customer }));
      }
      this.router.navigateByUrl('/customer');
    }
  }
}

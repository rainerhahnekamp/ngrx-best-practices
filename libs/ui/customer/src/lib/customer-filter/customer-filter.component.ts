import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { combineLatest, Subject, Subscription } from 'rxjs';
import { tap, debounceTime } from 'rxjs/operators';
import { countries } from '../countries';

export interface Filter {
  page: number;
  name?: string;
  country?: string;
}

@Component({
  selector: 'eternal-customer-filter',
  templateUrl: './customer-filter.component.html',
  styleUrls: ['./customer-filter.component.scss']
})
export class CustomerFilterComponent implements OnInit, OnDestroy {
  @Input() filter: Filter;
  @Output() filterChange = new EventEmitter<Filter>();

  countries = countries;
  form: FormGroup;
  sub: Subscription;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      name: [''],
      country: ['']
    });
  }

  ngOnInit(): void {
    this.sub = this.form.valueChanges
      .pipe(debounceTime(300))
      .subscribe(values =>
        this.filterChange.emit({ ...values, page: this.filter.page })
      );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  switchPage(page: number) {
    this.filterChange.emit({
      page,
      ...this.form.value
    });
  }
}

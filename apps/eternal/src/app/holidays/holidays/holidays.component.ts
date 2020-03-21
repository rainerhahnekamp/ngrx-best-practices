import { Component, OnInit } from '@angular/core';
import { Holiday } from '../holiday';
import { holidays } from '../data';

@Component({
  selector: 'eternal-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent implements OnInit {
  holidays: Holiday[];
  constructor() {
    this.holidays = holidays;
  }

  ngOnInit(): void {
    console.log('here');
  }
}

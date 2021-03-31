import { Component } from '@angular/core';
import { holidays } from '../data';
import { Holiday } from '../holiday';

@Component({
  selector: 'eternal-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent {
  holidays: Holiday[] = holidays;
}

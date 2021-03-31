import { Injectable } from '@angular/core';
import { of } from 'rxjs';

export interface User {
  fullName: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserData {
  get user$() {
    return of({ fullName: 'Hugo Brandt' });
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TempUnitToggleService {
  private fahrenheitUnitSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  fahrenheitUnit$: Observable<boolean> = this.fahrenheitUnitSubject.asObservable();

  constructor() {
    this.getFahrenheitUnit();
  }

  getFahrenheitUnit() {
    const localStorageValue = localStorage.getItem('fahrenheitUnit');
    if (localStorageValue !== null) {
      this.fahrenheitUnitSubject.next(JSON.parse(localStorageValue));
    }
  }

  setFahrenheitUnit(value: boolean) {
    localStorage.setItem('fahrenheitUnit', JSON.stringify(value));
    this.fahrenheitUnitSubject.next(value);
  }
}

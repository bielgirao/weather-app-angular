import {Component, OnInit, OnDestroy} from '@angular/core';
import {TempUnitToggleService} from "../../service/temp-unit-toggle.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-toggle-btn',
  templateUrl: './toggle-btn.component.html',
  styleUrls: ['./toggle-btn.component.scss']
})
export class ToggleBtnComponent implements OnInit, OnDestroy {
  isChecked: boolean = false;
  private subscription: Subscription;

  constructor(
    private tempUnitService: TempUnitToggleService
  ) {
    this.subscription = this.tempUnitService.fahrenheitUnit$.subscribe(
      (value) => {
        this.isChecked = value;
      })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCheckboxChange() {
    this.isChecked = !this.isChecked;
    this.tempUnitService.setFahrenheitUnit(this.isChecked);
  }
}

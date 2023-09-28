import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {addDays} from 'date-fns';
import {environment} from '../../environments/environment';
import {lastValueFrom, Observable, Subscription} from "rxjs";
import {TempUnitToggleService} from "../service/temp-unit-toggle.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  fahrenheitUnit: boolean = false;
  private subscription: Subscription;
  cityInfo: any;
  cityName: string = '';
  searchingError: boolean = false;
  isInputEmpty: boolean = true;
  today: Date = new Date();
  tomorrow: Date = addDays(this.today, 1);
  lastDay: Date = addDays(this.today, 2);
  fb: FormGroup;


  constructor(
    private form: FormBuilder,
    private httpClient: HttpClient,
    private tempUnitService: TempUnitToggleService) {
    this.fb = this.form.group({
        'search-bar': ''
    });

    this.subscription = this.tempUnitService.fahrenheitUnit$.subscribe(
      (value) => {
        this.fahrenheitUnit = value;
      })
  }

  ngOnInit(){
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async getWeatherInfo(){
    const rawSearchedCity: string = this.fb.controls['search-bar'].value;
    this.cityName = rawSearchedCity.toLocaleUpperCase();
    const searchedCity: string = rawSearchedCity.toLowerCase().replaceAll(' ', '-');
    const requestUrl = `https://api.weatherapi.com/v1/forecast.json?key=${environment.apiKey}&q=${searchedCity}&days=2&aqi=no&alerts=no`

    try {
      const response: Observable<any> = this.httpClient.get(requestUrl);
      this.cityInfo = await lastValueFrom(response)
    } catch(error) {
      this.searchingError = true;
      this.cityInfo = ''
    }
  }

  onFocusInput() {
    this.isInputEmpty = false;
    this.searchingError = false;
  }

  onBlurInput(event: any) {
    const value = event.target.value || '';
    if (value.trim() === '') {
      this.isInputEmpty = true;
    }
  }
}

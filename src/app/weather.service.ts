import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CityInterface } from './shared/interfaces/city.interface';
import { Observable } from 'rxjs';

const citiesData: Array<CityInterface> = [
  {id: 0, name: 'Saint-Petersburg'},
  {id: 1, name: 'San Francisco'},
  {id: 2, name: 'Moscow'},
  {id: 3, name: 'South Park'},
];

interface WeatherServiceInterface {
  cities: Array<CityInterface>;

  getCities(): Array<CityInterface>;
  getWeather(city: CityInterface): Observable<any>;
  getCityById(id: number): CityInterface;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService implements WeatherServiceInterface {
  cities: Array<CityInterface> = citiesData;

  constructor(private http: HttpClient) { }

  getCityById(id: number): CityInterface {
    return this.cities.find(el => el.id === +id);
  }

  getCities(): Array<CityInterface> {
    return this.cities;
  }

  getWeather(city: CityInterface): Observable<any> {
    /* tslint:disable-next-line */
    const searchText = `select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text='${city.name}') and u='c'`;
    const weatherUrl = `https://query.yahooapis.com/v1/public/yql?format=json&q=${searchText}`;

    return this.http.get(weatherUrl);
  }
}

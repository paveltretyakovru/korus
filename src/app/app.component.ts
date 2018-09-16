import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { CityInterface } from './shared/interfaces/city.interface';

interface AppComponentInterface {
  title: string;
  cityId: number;
  cities: Array<CityInterface>;
  weathers: Array<string>;

  getWeatherHandler(): void;
  getWeatherSuccessResponse(data: any): void;
  getWeatherErrorResponse(error: any): void;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ WeatherService ],
})
export class AppComponent implements OnInit, AppComponentInterface {
  title = 'Check the weather';
  cityId = 0;
  cities: Array<CityInterface> = [];
  weathers: Array<string> = [];

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.cities = this.weatherService.getCities();
  }

  getWeatherHandler(): void {
    const city = this.weatherService.getCityById(this.cityId);

    this.weatherService
        .getWeather(city)
        .subscribe(
          this.getWeatherSuccessResponse.bind(this),
          this.getWeatherErrorResponse.bind(this),
        );
  }

  getWeatherSuccessResponse(data): void {
    const { temp, text } = data.query.results.channel.item.condition;
    const city = this.weatherService.getCityById(this.cityId);
    const message = `${city.name} - ${text}: ${temp}°C`;

    this.weathers.push(message);
  }

  getWeatherErrorResponse(error): void {
    console.error('Error on get weather', { error });
  }
}

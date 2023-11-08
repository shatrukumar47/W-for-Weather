import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {
  private apiKey = 'd04578fb62fb20e89a7de1f68e16dd34';
  private baseUrl = 'https://api.openweathermap.org/data/2.5';
  constructor(private http: HttpClient) { }
  getWeather(cityName: string, unit:string) {
    const url = `${this.baseUrl}/weather?q=${cityName}&appid=${this.apiKey}&units=${unit}`;
    return this.http.get(url);
  }
}

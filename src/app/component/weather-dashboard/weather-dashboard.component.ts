import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WeatherServiceService } from 'src/app/service/weather-service.service';

@Component({
  selector: 'app-weather-dashboard',
  templateUrl: './weather-dashboard.component.html',
  styleUrls: ['./weather-dashboard.component.css'],
})
export class WeatherDashboardComponent implements OnInit {
  cityName: string = 'New Delhi';
  unit: string = 'metric';
  countryName: any = '';
  weatherData: any = {};
  timeStamp: any = '';
  constructor(private weatherServices: WeatherServiceService) {}

  ngOnInit(): void {
    this.fetchWeatherData();
  }

  fetchWeatherData() {
    this.weatherServices.getWeather(this.cityName, this.unit).subscribe(
      (data) => {
        this.weatherData = data;
        console.log(this.weatherData);
        this.convertzCountryCode(this.weatherData?.sys?.country);
        this.timeStamp = this.convertTimeStamp(
          this.weatherData.dt,
          this.weatherData.timezone
        );
        console.log('timeStamp', this.timeStamp);
      },
      (error) => {
        console.error('Error fetching weather data:', error);
      }
    );
  }

  convertzCountryCode(country: any) {
    let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    this.countryName = regionNames.of(country);
  }

  convertTimeStamp(timestamp: any, timezone: any) {
    const convtSecToHr = timezone / 3600;
    const date = new Date(timestamp * 1000);
    return new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'full',
      timeStyle: 'long',
      timeZone: 'Asia/Kolkata',
    }).format(date);
  }

  handleChange() {
    if (this.cityName) {
      console.log(this.cityName);
      this.fetchWeatherData();
    }
  }

  handleRefresh(){
    this.fetchWeatherData();
  }

  handleCelcius() {
    if (this.unit !== 'metric') {
      this.unit = 'metric';
      this.fetchWeatherData();
    }
  }

  handleFarenheight() {
    if (this.unit !== 'imperial') {
      this.unit = 'imperial';
      this.fetchWeatherData();
    }
  }
}

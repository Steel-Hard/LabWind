export interface ISensorData {
    reading_time: string; 
    time: string,
    temp: number;
    hum: number;
    bar: number;
    cab_temp: number;
    bat_volts: number;
    uv_level: number;
    wind_peak: number;
    wind_rt: number;
    wind_avg: number;
    wind_dir_rt: number;
    wind_dir_avg: number;
    estacao: string;
}

export interface WeatherAlertData {
  timestamp: string;
  alerts: string[];
}

export interface IWeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: WeatherTypes[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface WeatherTypes{
  id: number;
    main: string;
    description: string;
    icon: string;
}
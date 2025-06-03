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

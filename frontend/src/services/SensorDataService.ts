import { api } from "./api";
import { ISensorData } from "../types";

export interface WeatherData {
  wind: { value: number; unit: string };
  temperature: { value: number; unit: string };
  pressure: { value: number; unit: string };
  humidity: { value: number; unit: string };
  solarRadiation: { value: number; unit: string };
  waves: { value: number; unit: string };
}

class SensorDataService{
    public static async getData():Promise<ISensorData[]>{
        const {data} = await api.get<ISensorData[]>("/sensor-data/find/2024-09-01T03:00:00.000Z");

        console.log(data)

        return data;
    }
}

export default SensorDataService;

export const getSimulatedWeatherData = (): WeatherData => {
  return {
    wind: { value: Math.random() * 30, unit: 'km/h' },
    temperature: { value: 20 + Math.random() * 10, unit: '°C' },
    pressure: { value: 1000 + Math.random() * 30, unit: 'hPa' },
    humidity: { value: 40 + Math.random() * 40, unit: '%' },
    solarRadiation: { value: 500 + Math.random() * 500, unit: 'W/m²' },
    waves: { value: 0.5 + Math.random() * 2, unit: 'm' }
  };
};
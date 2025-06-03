/* eslint-disable @typescript-eslint/no-explicit-any */
import { Header, Nav, WeatherAlerts, WeatherCard } from '../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWind,
  faTemperatureHigh,
  faWater,
  faSun,
  faGaugeHigh,
  faDroplet,

} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import BarragemService from '../services/BarragemService';
import { ISensorData } from '../types';
import LabwindDataService from '../services/LabwindDataService';
import "./styles/Dashboard.css"

const Dashboard: React.FC = () => {
  const [sensor, setSensor] = useState<ISensorData>();
  const [barragemData, setBarragemData] = useState<string | any>();

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const data = await LabwindDataService.fetchLastOccurrence();
        setSensor(data);
      } catch (error) {
        console.error("Erro ao buscar dados do sensor:", error);
      }
    };
    fetchSensorData();
  }, []);

  useEffect(() => {
    const fetchBarragemData = async () => {
      try {
        const response = await BarragemService.getStatus();
        setBarragemData(response.volumeUtil);
      } catch (error) {
        console.error("Erro ao buscar dados da barragem:", error);
      }
    };
    fetchBarragemData();
  }, []);

  return (
    <>
      <Header>
        <Nav />
      </Header>

      <div className="page-container min-h-screen flex flex-col items-center p-4">
        <div className="grid-container grid grid-cols-3 gap-8 w-full max-w-[1800px]">
          <WeatherCard
            title="Temperatura"
            value={sensor?.temp !== undefined ? sensor.temp : '--'}
            unit="°C"
            icon={<FontAwesomeIcon size={'5x'} color='black' icon={faTemperatureHigh} />}
            type="temperature"
          />
          <WeatherCard
            title="Umidade"
            value={sensor?.hum !== undefined ? sensor.hum : '--'}
            unit="%"
            icon={<FontAwesomeIcon size={'5x'} color='black' icon={faDroplet} />}
            type="humidity"
          />
          <WeatherCard
            title="Pressão Atmosférica"
            value={sensor?.bar !== undefined ? sensor.bar : '--'}
            unit="hPa"
            icon={<FontAwesomeIcon size={'5x'} color='black' icon={faGaugeHigh} />}
            type="pressure"
          />
          <WeatherCard
            title="Radiação Solar"
            value={sensor?.uv_level !== undefined ? sensor.uv_level : '--'}
            unit="W/m²"
            icon={<FontAwesomeIcon size={'5x'} color='black' icon={faSun} />}
            type="solarRadiation"
          />
          <WeatherCard
            title="Velocidade do Vento"
            value={sensor?.wind_rt !== undefined ? sensor.wind_rt : '--'}
            unit="m/s"
            icon={<FontAwesomeIcon size={'5x'} color='black' icon={faWind} />}
            type="windSpeed"
          />
          <WeatherCard
            title="Direção do Vento"
            value={sensor?.wind_dir_rt !== undefined ? sensor.wind_dir_rt : '--'}
            unit="°"
            icon={<FontAwesomeIcon size={'5x'} color='black' icon={faWind} />}
            type="windDirection"
          />
          
          <div className="weather-card bg-white rounded-lg shadow-md p-4 flex items-center justify-center min-h-[220px] min-w-[400px]">
            <span className="text-gray-400">Card Vazio</span>
          </div>
          {barragemData && (
            <WeatherCard
              title="Volume da Barragem"
              value={barragemData}
              unit="%"
              icon={<FontAwesomeIcon size={'5x'} color='black' icon={faWater} />}
              type="dam"
            />
          )}
          <div className="weather-card bg-white rounded-lg shadow-md p-4 flex items-center justify-center min-h-[220px] min-w-[400px]">
            <span className="text-gray-400">Card Vazio</span>
          </div>
        </div>
      </div>


      <WeatherAlerts/>
    </>
  );
};

export default Dashboard;

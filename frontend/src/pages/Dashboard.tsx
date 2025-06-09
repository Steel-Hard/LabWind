/* eslint-disable @typescript-eslint/no-explicit-any */
import { Header, Nav, WeatherAlerts, WeatherCard } from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWind,
  faTemperatureHigh,
  faWater,
  faSun,
  faGaugeHigh,
  faDroplet,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import BarragemService from "../services/BarragemService";
import { ISensorData, IWeatherData } from "../types";
import LabwindDataService from "../services/LabwindDataService";
import "./styles/Dashboard.css";
import OpenWeatherService from "../services/OpenWeather";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Corrige o ícone padrão do Leaflet para builds React/Vite
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Dashboard: React.FC = () => {
  const [sensor, setSensor] = useState<ISensorData>();
  const [barragemData, setBarragemData] = useState<string | any>();
  const [previsao, setPrevisao] = useState<IWeatherData>();
  const position: LatLngExpression = [-21.026146884566906, -46.13282320900263];

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

  useEffect(() => {
    const fetchPrevisao = async () => {
      const response = await OpenWeatherService.getPrevisao();
      setPrevisao(response);
    };
    fetchPrevisao();
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
            value={sensor?.temp !== undefined ? sensor.temp : "--"}
            unit="°C"
            icon={
              <FontAwesomeIcon
                size={"5x"}
                color="white"
                icon={faTemperatureHigh}
              />
            }
            type="temperature"
          />
          <WeatherCard
            title="Umidade"
            value={sensor?.hum !== undefined ? sensor.hum : "--"}
            unit="%"
            icon={
              <FontAwesomeIcon size={"5x"} color="white" icon={faDroplet} />
            }
            type="humidity"
          />
          <WeatherCard
            title="Pressão Atmosférica"
            value={sensor?.bar !== undefined ? sensor.bar : "--"}
            unit="hPa"
            icon={
              <FontAwesomeIcon size={"5x"} color="white" icon={faGaugeHigh} />
            }
            type="pressure"
          />
          <WeatherCard
            title="Radiação Solar"
            value={sensor?.uv_level !== undefined ? sensor.uv_level : "--"}
            unit="W/m²"
            icon={<FontAwesomeIcon size={"5x"} color="white" icon={faSun} />}
            type="solarRadiation"
          />
          <WeatherCard
            title="Velocidade do Vento"
            value={sensor?.wind_rt !== undefined ? sensor.wind_rt : "--"}
            unit="m/s"
            icon={<FontAwesomeIcon size={"5x"} color="white" icon={faWind} />}
            type="windSpeed"
          />
          <WeatherCard
            title="Direção do Vento"
            value={
              sensor?.wind_dir_rt !== undefined ? sensor.wind_dir_rt : "--"
            }
            unit="°"
            icon={<FontAwesomeIcon size={"5x"} color="white" icon={faWind} />}
            type="windDirection"
          />
          <WeatherCard
            title="Previsão do tempo"
            value={
              previsao?.weather !== undefined
                ? previsao.weather[0].description
                : "--"
            }
            icon={<FontAwesomeIcon size={"5x"} color="white" icon={faWind} />}
            type="previsao"
            espValue={previsao?.weather[0].main}
          />
          {barragemData && (
            <WeatherCard
              title="Volume da Barragem"
              value={barragemData}
              unit="%"
              icon={
                <FontAwesomeIcon size={"5x"} color="white" icon={faWater} />
              }
              type="dam"
            />
          )}
          <div className="weather-card map-card">
            <MapContainer
              center={position}
              zoom={10}
              scrollWheelZoom={true}
              style={{ width: "100%", height: "100%" }}
            >
              <TileLayer
                attribution=""
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>Represa de Furnas</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>

      <WeatherAlerts />
    </>
  );
};

export default Dashboard;

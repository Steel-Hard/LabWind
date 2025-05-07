import { useState, useEffect } from "react";
import { ISensorData } from "../types";
import SensorDataService from "../services/SensorDataService";
import converteDate from "../utils/data";
import { Header, Nav } from "../components";

export default function Tabelas() {
  const [data, setData] = useState<ISensorData[]>([]);

  useEffect(() => {
    const fetchSensor = async () => {
      const sensor = await SensorDataService.getData();
      setData(sensor);
    };
    fetchSensor();
  }, []);

  return (
    <>
      <Header>
        <Nav />
      </Header>
      <div className="w-full overflow-x-auto mt-20">
        <table className="min-w-[600px] w-full text-sm text-center rtl:text-center text-gray-500 dark:text-gray-400 border-collapse border border-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th>Data</th>
              <th>Hora</th>
              <th>Temp (°C)</th>
              <th>Hum(%)</th>
              <th>Pressão (Bar)</th>
              <th>Temp Cabine (°C)</th>
              <th>Carga</th>
              <th>SR (W/m²)</th>
              <th>Wind Peak (m/s)</th>
              <th>Wind Inst (m/s)</th>
              <th>Wind Média (m/s)</th>
              <th>Wind Dir Inst</th>
              <th>Wind Dir Média</th>
            </tr>
          </thead>
          <tbody>
            {data.map((sensorData, index) => (
              <tr
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                key={index}
              >
                <td>{converteDate(sensorData.date)}</td>
                <td>{sensorData.time}</td>
                <td>{sensorData.temp_C}</td>
                <td>{sensorData.hum}</td>
                <td>{sensorData.press_Bar}</td>
                <td>{sensorData.tempCabine_C}</td>
                <td>{sensorData.charge}</td>
                <td>{sensorData.SR_Wm2}</td>
                <td>{sensorData.WindPeak_ms}</td>
                <td>{sensorData.WindSpeed_Inst}</td>
                <td>{sensorData.WindSpeed_Avg}</td>
                <td>{sensorData.WindDir_Inst}</td>
                <td>{sensorData.WindDir_Avg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

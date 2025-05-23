import {converteDate} from "../utils/data";
import { Header, Nav, Options } from "../components";
import {  useLabwind } from "../contexts/labwindContext";

export default function Tabelas() {
  const { data } = useLabwind();

  return (
    <>
    
      <Header isTransparent={false}>
        <Nav />
      </Header>

      <Options estacoesSelector={true} date={true}/>
      <div className="w-full overflow-x-auto mt-20 ">
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
            {data && data.map((sensorData, index) => (
              <tr
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
              key={index}
              >
                <td>{converteDate(sensorData.reading_time)}</td>
                <td>{sensorData.time}</td>
                <td>{sensorData.temp}</td>
                <td>{sensorData.hum}</td>
                <td>{sensorData.bar}</td>
                <td>{sensorData.cab_temp}</td>
                <td>{sensorData.bat_volts}</td>
                <td>{sensorData.uv_level}</td>
                <td>{sensorData.wind_peak}</td>
                <td>{sensorData.wind_rt}</td>
                <td>{sensorData.wind_avg}</td>
                <td>{sensorData.wind_dir_rt}</td>
                <td>{sensorData.wind_dir_avg}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
    </>
  );
}

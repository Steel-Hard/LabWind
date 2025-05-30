import {converteDate} from "../utils/data";
import { Header, Nav, Options } from "../components";
import {  useLabwind } from "../contexts/labwindContext";
import Download from "../components/Download";

export default function Tabelas() {
  const { data} = useLabwind();




  return (
    <>
    
      <Header isTransparent={false}>
        <Nav />
      </Header>


      <Options/>
      <div className="w-full overflow-x-auto mt-10 ">
        <table className="min-w-[600px] w-full text-sm text-center rtl:text-center text-gray-500 dark:text-gray-400 border-collapse border border-gray-400">
          <thead className=" uppercase bg-gray-50  text-black font-light">
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
            {data && data.map((sensorData, index) =>{ 
              const local = new Date(sensorData.reading_time);
              const minutes = String(Math.floor(local.getUTCMinutes() / 10) * 10).padStart(2, "0");
              
              return (
                <>
                <Download/>

                <tr
                className="odd:bg-white  even:bg-gray-50  dark:border-gray-700 border-gray-200"
                key={index}
                >
                <td>{converteDate(local)}</td>
                <td>{`${local.getHours()}:${minutes}`}</td>
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
            </>
            )})}
          </tbody>
        </table>
      </div>
      
   
    
    </>
  );
}

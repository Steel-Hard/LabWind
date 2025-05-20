import { useState, useEffect } from "react";
import { Header, Nav } from "../components";
import SensorDataService from "../services/SensorDataService";
import { ISensorData } from "../types";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {Options} from "../components"

export default function Graph() {
  const [data, setData] = useState<ISensorData[]>([]);

  useEffect(() => {
    const fetchSensor = async () => {
      const sensor = await SensorDataService.getByDateAndEstacao("2025-05-01","A");
      setData(sensor);
    };
    fetchSensor();
  }, []);

  // Preprocessamento de dados para o gráfico
  const chartData = data.map((entry) => ({
    time: entry.time, // Utilizando o tempo para o eixo X
    WindSpeed_Avg: entry.WindSpeed_Avg,
    temp_C: entry.temp_C,
    hum: entry.hum,
    press_Bar: entry.press_Bar,
    SR_Wm2: entry.SR_Wm2, // Radiação solar
    WindPeak_ms: entry.WindPeak_ms, // Ondas (simbolicamente)
  }));

  return (
    <>
      <Header  isTransparent={false}>
        <Nav />
      </Header>

      <Options date={true} estacoes={true}/>

      <div className="mt-20 bg-white p-6">
       
        <div className="overflow-x-auto">
     
          <div className="mb-6" style={{ minWidth: '800px' }}>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="WindSpeed_Avg" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mb-6" style={{ minWidth: '800px' }}>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="temp_C" stroke="#ff7300" fill="#ff7300" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mb-6" style={{ minWidth: '800px' }}>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="press_Bar" stroke="#82ca9d" fill="#82ca9d" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mb-6" style={{ minWidth: '800px' }}>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="hum" stroke="#00bcd4" fill="#00bcd4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mb-6" style={{ minWidth: '800px' }}>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="SR_Wm2" stroke="#fbc02d" fill="#fbc02d" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mb-6" style={{ minWidth: '800px' }}>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="WindPeak_ms" stroke="#3f51b5" fill="#3f51b5" />
              </AreaChart>
            </ResponsiveContainer>
            {/*<ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time">
              <Label value="Tempo" offset={0} position="insideBottom" />
            </XAxis>
            <YAxis label={{ value: 'Temperatura (°C)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temp_C" stroke="url(#tempGradient)" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer> */}
          </div>
        </div>
        
        {/* Explicação dos Parâmetros */}
        <div className="mt-8">
          <h3 className="text-xl font-bold">Legenda:</h3>
          <ul className="list-disc pl-6">
            <li><strong>Vento (WindSpeed_Avg):</strong> Velocidade média do vento (em metros por segundo).</li>
            <li><strong>Temperatura (temp_C):</strong> Temperatura do ar (em graus Celsius).</li>
            <li><strong>Pressão (press_Bar):</strong> Pressão atmosférica (em hPa).</li>
            <li><strong>Umidade (hum):</strong> Umidade relativa do ar (em %).</li>
            <li><strong>Radiação Solar (SR_Wm2):</strong> Quantidade de radiação solar recebida por metro quadrado (em W/m²).</li>
            <li><strong>Ondas (WindPeak_ms):</strong> Velocidade máxima do vento (utilizada como proxy para ondas) (em metros por segundo).</li>
          </ul>
        </div>
      </div>
    </>
  );
}

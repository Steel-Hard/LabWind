/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import  { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import SensorDataService from '../services/SensorDataService';
import LabwindDataService  from "../services/LabwindDataService"
import { ISensorData } from '../types';

type SensorContextType = {
  stations: string[];
  setStations: (s: string[]) => void;
  date: string;
  setDate: (d: string) => void;
  chartData: ISensorData[];
};

const GraphContext = createContext<SensorContextType | undefined>(undefined);

export const useSensor = () => {
  const ctx = useContext(GraphContext);
  if (!ctx) throw new Error('useSensor must be used within GraphProvider');
  return ctx;
};

export const GraphProvider = ({ children }: { children: ReactNode }) => {
  const [stations, setStations] = useState<string[]>([]);
  const [date, setDate] = useState<string>('');
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (!date || stations.length === 0) {
      setChartData([]);
      return;
    }

    const METRICS = [
      'temp',       
      'hum',        
      'bar',        
      'uv_level',   
      'wind_avg',   
      'wind_peak'   
    ];

    Promise.all(
    stations.map(est => {
      if (est === 'origem') {
       
        return LabwindDataService.fetchByDate(date).then(data =>
          data.map(d => ({
            time: `${new Date(d.reading_time).getHours()}:${String(Math.floor(new Date(d.reading_time).getUTCMinutes() / 10) * 10).padStart(2, "0")}`, 
            ...METRICS.reduce((acc, key) => {
              acc[`${key}_${est}`] = (d as any)[key];
              return acc;
            }, {} as Record<string, any>)
          }))
        );
      } else {
   
        return SensorDataService.getByDateAndEstacao(date, est === "simulada_1" ? "A":"B").then(data =>
          data.map(d => ({
            time: d.time,
            ...METRICS.reduce((acc, key) => {
              acc[`${key}_${est}`] = (d as any)[key];
              return acc;
            }, {} as Record<string, any>)
          }))
        );
      }
    })
  ).then(arrays => {
    const merged: any[] = [];
    const len = arrays[0]?.length || 0;
    for (let i = 0; i < len; i++) {
      merged.push(Object.assign({}, ...arrays.map(arr => arr[i])));
    }
    setChartData(merged);
  });

  }, [stations, date]);

  return (
    <GraphContext.Provider value={{ stations, setStations, date, setDate, chartData }}>
      {children}
    </GraphContext.Provider>
  );
};

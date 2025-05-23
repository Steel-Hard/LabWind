/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import SensorDataService from "../services/SensorDataService";
import { ISensorData } from "../types";
import LabwindDataService from "../services/LabwindDataService";
import { yearMonthDay } from "../utils/data";

export enum Station {
  ORIGIN = "O",
  SIMULADA_1 = "A",
  SIMULADA_2 = "B",
}

type SensorContextType = {
  station: Station | undefined;
  setStation: (s: Station) => void;
  date: string;
  setDate: (d: string) => void;
  data: ISensorData[];
  setData: (data: ISensorData[]) => void;
};


const LabwindContext = createContext<SensorContextType | undefined>(undefined);


export const useLabwind = () => {
  const ctx = useContext(LabwindContext);
  if (!ctx) throw new Error("useSensor must be used within SensorProvider");
  return ctx;
};

export const LabwindProvider = ({ children }: { children: ReactNode }) => {
  const [station, setStation] = useState<Station>();
  const [date, setDate] = useState<string>("");
  const [data, setData] = useState<ISensorData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
    if (!station && !date) return;

    if (station === Station.SIMULADA_1 || station === Station.SIMULADA_2) {
      const ndata = await SensorDataService.getByDateAndEstacao(date, station);
      setData(ndata);
    }

    if (station === Station.ORIGIN) {
      const ndata = await LabwindDataService.fetchByDate( yearMonthDay(date) );
      setData(ndata);
    }
  };

  fetchData();

  }, [station, date]);

  return (
    <LabwindContext.Provider
      value={{ station, setStation, date, setDate, data, setData}}
    >
      {children}
    </LabwindContext.Provider>
  );
};

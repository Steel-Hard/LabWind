import ApiService from "./ApiService";
import { ISensorData } from "../types";

class SensorDataService extends ApiService {
  constructor() {
    super("/sensor-data");
  }

  async getByDateAndEstacao(date: string, estacao: string): Promise<ISensorData[]> {
    return this.get<ISensorData[]>(`/${date}/${estacao}`);
  }

  
  async getByDate(date: string): Promise<ISensorData[]> {
    console.log(date)
    return this.get<ISensorData[]>(`/${date}`);
  }

  
  async getById(id: string): Promise<ISensorData> {
    return this.get<ISensorData>(`/${id}`);
  }

}

export default new SensorDataService;

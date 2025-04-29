import { api } from "./api";
import { ISensorData } from "../types";



class SensorDataService{
    public static async getData():Promise<ISensorData[]>{
        const {data} = await api.get<ISensorData[]>("/sensor-data/find/2024-09-01T03:00:00.000Z");

        console.log(data)

        return data;
    }
}

export default SensorDataService;
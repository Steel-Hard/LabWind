/* eslint-disable @typescript-eslint/no-explicit-any */
import { openWeatheraApi } from "./api";

export class OpenWeatherService {
  public async getPrevisao(): Promise<any> {

    const lat = -20.7213;
    const lon = -46.1447;

    try {

    

        const {data} = await openWeatheraApi.get(
        `weather?lat=${lat}&lon=${lon}&appid=6a77a2d548f1e6e2f2ce22bf3cd7981f&units=metric&lang=pt_br`
        );

        console.log(data);

      return data;
    } catch (error) {
      console.log("[PSIU]: ERRO OPEN WEATHER: ", error);
    }
  }
}

export default new OpenWeatherService;
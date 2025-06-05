import { ISensorData, WeatherAlertData } from "../types";
import ApiService from "./ApiService";

class LabwindDataService extends ApiService {
    constructor() {
        super("/labwind");
    }

    async fetchByDate(date: string) {
        return this.get<ISensorData[]>(`/by-date?date=${date}`);
    }

    async fetchLastOccurrence() {
        return this.get<ISensorData>("/last");
    }

    async fetchExtremeValues() {
        return this.get("/extremes");
    }

    async fetchForChart() {
        return this.get("/chart");
    }

    async checkAlerts() {
        return this.get<WeatherAlertData>("/alerts");
    }
}

export default new LabwindDataService;
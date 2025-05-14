import ApiService from "./ApiService";

class LabwindDataService extends ApiService {
    constructor() {
        super("/labwind");
    }

    async fetchByDate(date: string) {
        return this.get(`/by-date?date=${date}`);
    }

    async fetchLastOccurrence() {
        return this.get("/last");
    }

    async fetchExtremeValues() {
        return this.get("/extremes");
    }

    async fetchForChart() {
        return this.get("/chart");
    }

    async checkAlerts() {
        return this.get("/alerts");
    }
}

export default new LabwindDataService;
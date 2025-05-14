import ApiService from "./ApiService";

class BarragemService extends ApiService{
    constructor() {
        super("/barragem");
    }

    async getStatus() {
        return this.get("/");

    }
}


export default new BarragemService();
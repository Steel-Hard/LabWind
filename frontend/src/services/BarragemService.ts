import ApiService from "./ApiService";

interface barragem {
    volumeUtil:string
}




class BarragemService extends ApiService{
    constructor() {
        super("/barragem");
    }

    async getStatus() {
        return this.get<barragem>("/");

    }
}


export default new BarragemService();
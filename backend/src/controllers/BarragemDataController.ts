import { RequestHandler } from "express";
import axios from "axios";
import * as cheerio from "cheerio";

class BarragemDataController {
  static buscarVolumeUtil: RequestHandler = async (req, res) => {
    const { dataInicial, dataFinal } = req.body;

    if (!dataInicial || !dataFinal) {
      res.status(400).json({
        error:
          "Parâmetros 'dataInicial' e 'dataFinal' são obrigatórios. Siga o padrão DD-MM-AAAA",
      });
      return;
    }

    try {
      const url = `https://www.ana.gov.br/sar0/MedicaoSin?dropDownListEstados=14&dropDownListReservatorios=19004&dataInicial=${dataInicial}&dataFinal=${dataFinal}&button=Buscar`;
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const volumeUtil = $("td.coluna_9").first().text().trim();

      res.json({ volumeUtil });
    } catch (error) {
      console.error("Erro ao buscar dados da ANA:", error);
      res.status(500).json({ error: "Erro ao buscar dados da ANA" });
    }
  };
}

export default BarragemDataController;

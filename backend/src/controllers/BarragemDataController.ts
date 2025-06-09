import { RequestHandler } from "express";
import converteDate from "../utils/data";
import axios from "axios";
import * as cheerio from "cheerio";

let cachedVolumeUtil: string = "Cahce não carregado.";

class BarragemDataController {
  static buscarVolumeUtil: RequestHandler = async (req, res): Promise<any> => {
    const dataSimples = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString();
    const dataFormatada = converteDate(dataSimples);
    const dataInicial = dataFormatada;
    const dataFinal = dataInicial;
    try {
      const url = `https://www.ana.gov.br/sar0/MedicaoSin?dropDownListEstados=14&dropDownListReservatorios=19004&dataInicial=${dataInicial}&dataFinal=${dataFinal}&button=Buscar`;
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const volumeUtilAtual = $("td.coluna_9").first().text().trim();

      if (cachedVolumeUtil === volumeUtilAtual) {
        // Valor ainda é o mesmo ou ainda não há cache
        return res.json({ volumeUtil: cachedVolumeUtil, cached: true });
      } else {
        // Valor mudou, atualizar cache
        cachedVolumeUtil = volumeUtilAtual;
        return res.json({ volumeUtil: volumeUtilAtual, cached: false });
      }
    } catch (error) {
      console.error("Erro ao buscar dados da ANA:", error);
      res.status(500).json({ error: "Erro ao buscar dados da ANA" });
    }
  };
}

export default BarragemDataController;
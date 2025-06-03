import { RowDataPacket } from "mysql2";
import pool from "../services/labwind/db";
import { Request, Response } from "express";
import { ISensorData } from "../types/interfaces/ISensorData";

class LabwindDataController {
  public async findByDate(req: Request, res: Response): Promise<void> {
    const { date } = req.query;
    if (!date) {
      res
        .status(400)
        .json({ error: "Parâmetro 'date' é obrigatório (YYYY-MM-DD)" });
      return;
    }

    try {
      const [rows] = await pool.query(
        `SELECT * FROM Sensor 
                 WHERE reading_time >= ? AND reading_time < DATE_ADD(?, INTERVAL 1 DAY)
                 ORDER BY reading_time ASC`,
        [date, date]
      );
      res.json(rows);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao buscar dados por data", details: error });
    }
  }

  public async findLastOcurency(req: Request, res: Response): Promise<void> {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM Sensor ORDER BY reading_time DESC LIMIT 1"
      );
      res.json(rows[0] || {});
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao buscar último registro", details: error });
    }
  }

  public async findExtremeValues(req: Request, res: Response): Promise<void> {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(`
                SELECT 
                    MAX(temp) AS max_temp,
                    MIN(temp) AS min_temp,
                    MAX(wind_rt) AS max_wind,
                    MAX(uv_level) AS max_uv,
                    MAX(hum) AS max_humidity
                FROM sensor
            `);
      res.json(rows[0]);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao buscar extremos", details: error });
    }
  }

  public async findForChart(req: Request, res: Response): Promise<void> {
    const { date } = req.query;
    if (!date) {
      res
        .status(400)
        .json({ error: "Parâmetro 'date' é obrigatório (YYYY-MM-DD)" });
      return;
    }

    try {
      const [rows] = await pool.query(
        `SELECT reading_time, temp, hum, bar, wind_avg 
                 FROM Sensor 
                 WHERE reading_time >= ? AND reading_time < DATE_ADD(?, INTERVAL 1 DAY)
                 ORDER BY reading_time ASC`,
        [date, date]
      );
      res.json(rows);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao buscar dados para gráfico", details: error });
    }
  }

  public async checkAlerts(req: Request, res: Response): Promise<void> {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        `SELECT * FROM Sensor ORDER BY reading_time DESC LIMIT 1`
      );

      const data = rows[0] as ISensorData;
      if (!data) {
        res.status(404).json({ error: "Nenhum dado encontrado" });
        return;
      }

      const alerts: string[] = [];

      if (data.temp > 37)
        alerts.push("Calor extremo: temperatura acima de 37°C");
      else if (data.temp < 5)
        alerts.push("Frio intenso: temperatura abaixo de 5°C");

      if (data.hum < 20) alerts.push("Umidade crítica: abaixo de 20%");

      if (data.bar < 1000)
        alerts.push(
          "Pressão atmosférica baixa: possível frente fria ou tempestade"
        );

      const uv_irradiance = data.uv_level; 

      const uv_lv = uv_irradiance / 0.025;

      if (uv_lv >= 11) {
        alerts.push("Perigo extremo: Radiação UV extremamente alta!");
      } else if (uv_lv >= 8) {
        alerts.push(
          "Muito alto: risco significativo à saúde. Use proteção máxima."
        );
      } else if (uv_lv >= 6) {
        alerts.push("Alto: risco moderado a alto de queimaduras. Proteja-se.");
      } else if (uv_lv >= 3) {
        alerts.push("Moderado: risco leve, mas proteção recomendada.");
      } else {
        alerts.push("Baixo: risco mínimo de exposição.");
      }

      if (data.wind_rt > 25) {
        alerts.push("Vendaval perigoso: vento acima de 90 km/h");
      } else if (data.wind_rt > 15) {
        alerts.push("Vento forte: velocidade acima de 15 m/s");
      }

      const windDirections = [
        "Norte",
        "Norte-Nordeste",
        "Nordeste",
        "Leste-Nordeste",
        "Leste",
        "Leste-Sudeste",
        "Sudeste",
        "Sul-Sudeste",
        "Sul",
        "Sul-Sudoeste",
        "Sudoeste",
        "Oeste-Sudoeste",
        "Oeste",
        "Oeste-Noroeste",
        "Noroeste",
        "Norte-Noroeste",
      ];
      const dirIndex = Math.round(data.wind_dir_rt / 22.5) % 16;
      const windDirection = windDirections[dirIndex];
      alerts.push(`Direção do vento: ${windDirection}`);

      res.json({ timestamp: data.reading_time, alerts });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao verificar alertas", details: error });
    }
  }
}

export default new LabwindDataController();

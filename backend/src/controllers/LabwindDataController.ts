import { RowDataPacket } from "mysql2";
import pool from "../services/labwind/db";
import { Request,Response } from "express";


class LabwindDataController{
    public async findByDate(req: Request, res: Response): Promise<void> {
        const { date } = req.query;
        if (!date) {
            res.status(400).json({ error: "Parâmetro 'date' é obrigatório (YYYY-MM-DD)" });
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
            res.status(500).json({ error: "Erro ao buscar dados por data", details: error });
        }
    }
    

    public async findLastOcurency(req: Request, res: Response): Promise<void> {
        try {
            const [rows] = await pool.query<RowDataPacket[]>(
                "SELECT * FROM Sensor ORDER BY reading_time DESC LIMIT 1"
            );
            res.json(rows[0] || {});
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar último registro", details: error });
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
            res.status(500).json({ error: "Erro ao buscar extremos", details: error });
        }
    }
    

    public async findForChart(req: Request, res: Response): Promise<void> {
        const { date } = req.query;
        if (!date) {
            res.status(400).json({ error: "Parâmetro 'date' é obrigatório (YYYY-MM-DD)" });
            return;
        }
    
        try {
            const [rows] = await pool.query(
                `SELECT reading_time, temp, hum, bar, wind_avg 
                 FROM sensor 
                 WHERE reading_time >= ? AND reading_time < DATE_ADD(?, INTERVAL 1 DAY)
                 ORDER BY reading_time ASC`,
                [date, date]
            );
            res.json(rows);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar dados para gráfico", details: error });
        }
    }
    

    public async checkAlerts(req: Request, res: Response): Promise<void> {
        try {
            const [rows] = await pool.query<RowDataPacket[]>(
                `SELECT * FROM sensor ORDER BY reading_time DESC LIMIT 1`
            );
    
            const data = rows[0];
            if (!data) {
                res.status(404).json({ error: "Nenhum dado encontrado" });
                return;
            }
    
            const alerts = [];
    
            if (data.temp > 35) alerts.push("Temperatura acima de 35°C");
            if (data.wind_rt > 15) alerts.push("Rajadas de vento fortes (> 15 m/s)");
            if (data.hum < 20) alerts.push("Umidade muito baixa (< 20%)");
            if (data.bar < 1000) alerts.push("Possível frente fria (pressão < 1000 hPa)");
    
            res.json({ timestamp: data.reading_time, alerts });
        } catch (error) {
            res.status(500).json({ error: "Erro ao verificar alertas", details: error });
        }
    }
    

}


export default new LabwindDataController;
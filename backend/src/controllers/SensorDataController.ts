import { Request, Response } from "express";
import SensorDataModel from "../models/sensor";
import { ISensorData } from "../types/interfaces/ISensorData";


class SensorDataController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const sensorData: ISensorData = new SensorDataModel(req.body);
      const savedData = await SensorDataModel.insertOne(sensorData);
      res.status(201).json(savedData);
    } catch (error) {
      res.status(400).json({ message: "Erro ao criar dados do sensor", error });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = await SensorDataModel.findById(id);
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "Dados não encontrados" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar dado", error });
    }
  }

  async getByDateAndEstacao(req: Request, res: Response): Promise<void> {
    const {date,estacao} = req.params;
    try {
      
       const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    
       if (!dateRegex.test(date)) {
         res.status(400).json({ message: "Formato de data inválido. Use YYYY-MM-DD." });
         return Promise.resolve();
       }
   
       const inicioDia = new Date(`${date}T00:00:00.000Z`);
       const fimDia = new Date(`${date}T23:59:59.999Z`);

      const data = await SensorDataModel.find({
        date: {$gte: inicioDia, $lte: fimDia},
        estacao: estacao
        
      },)
      .sort({time: 1});
    
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar dados", error });
    }
  }

  async getByData(req: Request, res: Response): Promise<void> {
    const { date } = req.params;
    try {
  
      
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

      
      if (!dateRegex.test(date)) {
        res.status(400).json({ message: "Formato de data inválido. Use YYYY-MM-DD." });
        return Promise.resolve();
      }

      const inicioDia = new Date(`${date}T00:00:00.000Z`);
      const fimDia = new Date(`${date}T23:59:59.999Z`);
  
      const data = await SensorDataModel.find({
        date: { $gte: inicioDia, $lte: fimDia }
      });
  
      if (data && data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "Dados não encontrados" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar dado", error });
    }
  }
  


  async updateById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updatedData = await SensorDataModel.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      if (updatedData) {
        res.status(200).json(updatedData);
      } else {
        res.status(404).json({ message: "Dados não encontrados" });
      }
    } catch (error) {
      res.status(400).json({ message: "Erro ao atualizar dado", error });
    }
  }

  async deleteById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedData = await SensorDataModel.findByIdAndDelete(id);
      if (deletedData) {
        res.status(200).json({ message: "Dados deletados com sucesso" });
      } else {
        res.status(404).json({ message: "Dados não encontrados" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar dado", error });
    }
  }
}

export default new SensorDataController();

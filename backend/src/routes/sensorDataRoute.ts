import { Router } from 'express';
import  sensorDataController  from '../controllers/SensorDataController';

const router = Router();

router.post('/', (req, res) => sensorDataController.create(req, res));
router.get('/:date/:estacao', (req, res) => sensorDataController.getByDateAndEstacao(req, res));
router.get('/:date', (req,res) => sensorDataController.getByData(req,res));
router.get('/:id', (req, res) => sensorDataController.getById(req, res));
router.put('/:id', (req, res) => sensorDataController.updateById(req, res));
router.delete('/:id', (req, res) => sensorDataController.deleteById(req, res));

export default router;

import { Router } from 'express';
import labwindDataController from '../controllers/LabwindDataController'; 


const router = Router();

router.get('/by-date', labwindDataController.findByDate);
router.get('/last', labwindDataController.findLastOcurency);
router.get('/extremes', labwindDataController.findExtremeValues);
router.get('/chart', labwindDataController.findForChart);
router.get('/alerts', labwindDataController.checkAlerts);
router.get('/all',  labwindDataController.findAll);
router.get('/all_after_date_and_time', labwindDataController.findAllAfterDateTime);

export default router;

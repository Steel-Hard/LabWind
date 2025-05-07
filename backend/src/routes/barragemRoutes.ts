import { Router } from "express";
import BarragemDataController from "../controllers/BarragemDataController";

const router = Router();

router.post("/", BarragemDataController.buscarVolumeUtil);

export default router;

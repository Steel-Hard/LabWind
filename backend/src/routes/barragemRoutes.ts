import { Router } from "express";
import BarragemDataController from "../controllers/BarragemDataController";

const router = Router();

router.get("/", BarragemDataController.buscarVolumeUtil);

export default router;

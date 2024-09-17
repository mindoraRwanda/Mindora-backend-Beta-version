import { Router } from "express";
import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/servicesController";
import { uploadGeneral } from "../config/multerConfig";

const router = Router();

router.post("/services", uploadGeneral.single("picture"), createService);
router.get("/services", getServices);
router.get("/services/:id", getServiceById);
router.put("/services/:id", uploadGeneral.single("picture"), updateService);
router.delete("/services/:id", deleteService);

export default router;

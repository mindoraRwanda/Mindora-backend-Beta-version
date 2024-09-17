import { Router } from "express";
import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/servicesController";

const router = Router();

router.post("/services", createService);
router.get("/services", getServices);
router.get("/services/:id", getServiceById);
router.put("/services/:id", updateService);
router.delete("/services/:id", deleteService);

export default router;

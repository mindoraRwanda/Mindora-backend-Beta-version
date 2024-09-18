import { Router } from "express";
import { getResources } from "../controllers/resourcesController";

const router = Router();

router.get("/resources", getResources);

export default router;

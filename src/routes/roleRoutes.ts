import { Router } from "express";
import {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
} from "../controllers/roleController";

const router = Router();

router.post("/roles", createRole);
router.get("/roles", getRoles);
router.get("/roles/:id", getRoleById);
router.put("/roles/:id", updateRole);
router.delete("/roles/:id", deleteRole);

export default router;

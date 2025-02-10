import { Router } from "express";
import {
  createPermission,
  getPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
} from "../controllers/permissionController";

const router = Router();

router.post("/permissions", createPermission);
router.get("/permissions", getPermissions);
router.get("/permissions/:id", getPermissionById);
router.put("/permissions/:id", updatePermission);
router.delete("/permissions/:id", deletePermission);

export default router;

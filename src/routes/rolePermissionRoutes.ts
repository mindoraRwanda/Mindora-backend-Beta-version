import { Router } from "express";
import {
  assignPermissionToRole,
  removePermissionFromRole,
  getRolePermissions,
} from "../controllers/rolePermissionController";

const router = Router();

router.post("/roles/:roleId/permissions/:permissionId", assignPermissionToRole);
router.delete(
  "/roles/:roleId/permissions/:permissionId",
  removePermissionFromRole
);
router.get("/roles/:roleId/permissions", getRolePermissions);

export default router;

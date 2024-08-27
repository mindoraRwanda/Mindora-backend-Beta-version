import Router from "express";
import { changeRole, deleteAccount, updateAccount,getAllPatients,getAllTherapists } from "../controllers/admin.controller";
import { isAuthenticated,checkPermission } from "../middleware/auth.middleware";
const router = Router();
router.put('/rbac/roles/:id',isAuthenticated,changeRole)
router.put('/users/:id',isAuthenticated,updateAccount)
router.delete('/users/:id',isAuthenticated,deleteAccount)
router.get('/therapists',isAuthenticated,getAllTherapists)
router.get('/patients',isAuthenticated,getAllPatients)

export default router;
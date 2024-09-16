import { Router } from "express";
import {
  createPayment,
  getPayments,
  getPaymentById,
  getUserPayments,
  updatePayment,
  deletePayment,
} from "../controllers/paymentsController";

const router = Router();

router.post("/payments", createPayment);
router.get("/payments", getPayments);
router.get("/payments/user/:userId", getUserPayments);
router.get("/payments/:id", getPaymentById);
router.put("/payments/:id", updatePayment);
router.delete("/payments/:id", deletePayment);

export default router;

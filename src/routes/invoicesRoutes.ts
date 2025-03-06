import { Router } from "express";
import {
  createInvoice,
  getInvoices,
  getInvoiceById,
  getUserInvoices,
  updateInvoice,
  deleteInvoice,
} from "../controllers/invoiceController";
import { authorize } from "../middleware/rbac.middleware";

const router = Router();

// Create a new invoice
router.post("/invoices", authorize("create_invoice"), createInvoice);

// Get all invoices
router.get("/invoices", authorize("get_invoices"), getInvoices);
router.get(
  "/invoices/user/:userId",
  authorize("get_user_invoices"),
  getUserInvoices
);
router.get("/invoices/:id", authorize("get_invoice"), getInvoiceById);
router.put("/invoices/:id", authorize("update_invoice"), updateInvoice);
router.delete("/invoices/:id", authorize("delete_invoice"), deleteInvoice);

export default router;

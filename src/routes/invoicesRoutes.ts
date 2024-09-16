import { Router } from "express";
import {
  createInvoice,
  getInvoices,
  getInvoiceById,
  getUserInvoices,
  updateInvoice,
  deleteInvoice,
} from "../controllers/invoiceController";

const router = Router();

// Create a new invoice
router.post("/invoices", createInvoice);

// Get all invoices
router.get("/invoices", getInvoices);
router.get("/invoices/user/:userId", getUserInvoices);
router.get("/invoices/:id", getInvoiceById);
router.put("/invoices/:id", updateInvoice);
router.delete("/invoices/:id", deleteInvoice);

export default router;

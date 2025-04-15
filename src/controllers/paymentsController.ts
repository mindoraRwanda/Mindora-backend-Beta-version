import { Request, Response, NextFunction } from "express";
import Payment from "../database/models/payment";
import User from "../database/models/user";
import Invoice from "../database/models/invoice";

// Create a payment
export const createPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      userId,
      invoiceId,
      paymentMethod,
      amount,
      confirmed,
      insuranceClaimStatus,
    } = req.body;

    if (!userId || !invoiceId || !paymentMethod || !amount) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const payment = await Payment.create({
      userId,
      invoiceId,
      paymentMethod,
      amount,
      confirmed: confirmed || false,
      insuranceClaimStatus: insuranceClaimStatus || "Not Applicable",
    });

    res.status(201).json(payment);
  } catch (error) {
    next(error);
  }
};

// Get all payments
export const getPayments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payments = await Payment.findAll({
      include: [
        { model: User, as: "user" },
        { model: Invoice, as: "invoice" },
      ],
      order: [["createdAt", "DESC"]], // Order by createdAt descending
    });
    if (payments.length > 0) {
      return res.status(200).json(payments);
    } else {
      return res.status(404).json({ message: "Payments not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Get all payments for a particular user
export const getUserPayments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const payments = await Payment.findAll({
      where: { userId },
      include: [
        { model: User, as: "user" },
        { model: Invoice, as: "invoice" },
      ],
      order: [["createdAt", "DESC"]], // Order by createdAt descending
    });

    if (payments.length > 0) {
      return res.status(200).json(payments);
    } else {
      return res.status(404).json({ message: "User payments not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Get a payment by its ID
export const getPaymentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const payment = await Payment.findByPk(id, {
      include: [
        { model: User, as: "user" },
        { model: Invoice, as: "invoice" },
      ],
    });

    if (payment) {
      return res.status(200).json(payment);
    } else {
      return res.status(404).json({ message: "Payment not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update a payment
export const updatePayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!id || !data) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const payment = await Payment.findByPk(id);

    if (payment) {
      await payment.update(data);
      return res.status(200).json(payment);
    } else {
      return res.status(404).json({ message: "Payment not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a payment
export const deletePayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const payment = await Payment.findByPk(id);

    if (payment) {
      await payment.destroy();
      return res.status(204).json();
    } else {
      return res.status(404).json({ message: "Payment not found" });
    }
  } catch (error) {
    next(error);
  }
};

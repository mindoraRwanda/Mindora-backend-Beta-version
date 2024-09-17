import { Request, Response, NextFunction } from "express";
import BillingReport from "../database/models/billingReport";
import { generateBillingReport } from "../utils/generateBillingReport";

// Create a new billing report
export const createBillingReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const {
      totalRevenue,
      totalOutstandingBalance,
      approvedClaims,
      pendingClaims,
      rejectedClaims,
    } = await generateBillingReport(startDate, endDate);

    const billingReport = await BillingReport.create({
      startDate,
      endDate,
      totalRevenue,
      totalOutstandingBalance,
      approvedInsuranceClaims: approvedClaims,
      pendingInsuranceClaims: pendingClaims,
      rejectedInsuranceClaims: rejectedClaims,
    });

    res.status(201).json(billingReport);
  } catch (error) {
    next(error);
  }
};

// Get all billing reports
export const getBillingReports = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const billingReports = await BillingReport.findAll();
    res.status(200).json(billingReports);
  } catch (error) {
    next(error);
  }
};

// Get a single billing report by ID
export const getBillingReportById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const billingReport = await BillingReport.findByPk(id);

    if (billingReport) {
      return res.status(200).json(billingReport);
    } else {
      return res.status(404).json({ message: "Billing report not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update a billing report
export const updateBillingReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const { id } = req.params;

    if (!id || !data) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const billingReport = await BillingReport.findByPk(id);

    if (billingReport) {
      await billingReport.update(data);
      res.status(200).json(billingReport);
    } else {
      return res.status(404).json({ message: "Billing report not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a billing report
export const deleteBillingReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const billingReport = await BillingReport.findByPk(id);

    if (billingReport) {
      await billingReport.destroy();
      res.status(204).json();
    } else {
      return res.status(404).json({ message: "Billing report not found" });
    }
  } catch (error) {
    next(error);
  }
};

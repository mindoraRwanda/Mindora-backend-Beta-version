import { Request, Response, NextFunction } from "express";
import InsuranceServiceCoverage from "../database/models/insuranceServiceCoverage";

// Create a new InsuranceServiceCoverage
export const createInsuranceServiceCoverage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { insuranceId, serviceId, coveragePercentage } = req.body;

    if (!insuranceId || !serviceId || coveragePercentage === undefined) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const coverage = await InsuranceServiceCoverage.create({
      insuranceId,
      serviceId,
      coveragePercentage,
    });

    res.status(201).json(coverage);
  } catch (error) {
    next(error);
  }
};

// Get all InsuranceServiceCoverages
export const getInsuranceServiceCoverages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const coverages = await InsuranceServiceCoverage.findAll();
    res.status(200).json(coverages);
  } catch (error) {
    next(error);
  }
};

// Get a single InsuranceServiceCoverage by ID
export const getInsuranceServiceCoverageById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const coverage = await InsuranceServiceCoverage.findByPk(id);

    if (coverage) {
      res.status(200).json(coverage);
    } else {
      return res.status(404).json({ message: "Coverage not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update an InsuranceServiceCoverage
export const updateInsuranceServiceCoverage = async (
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

    const coverage = await InsuranceServiceCoverage.findByPk(id);

    if (coverage) {
      await coverage.update(data);
      res.status(200).json(coverage);
    } else {
      return res.status(404).json({ message: "Coverage not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete an InsuranceServiceCoverage
export const deleteInsuranceServiceCoverage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const coverage = await InsuranceServiceCoverage.findByPk(id);

    if (coverage) {
      await coverage.destroy();
      res.status(204).json();
    } else {
      return res.status(404).json({ message: "Coverage not found" });
    }
  } catch (error) {
    next(error);
  }
};

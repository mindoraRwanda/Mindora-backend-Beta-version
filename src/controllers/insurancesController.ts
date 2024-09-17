import { Request, Response, NextFunction } from "express";
import Insurance from "../database/models/insurance";
import Service from "../database/models/service";
import InsuranceServiceCoverage from "../database/models/insuranceServiceCoverage";
import Patient from "../database/models/patient";
import PatientInsurance from "../database/models/patientInsurance";

interface extendedPatientInsurance extends PatientInsurance {
  insurance?: Insurance;
}

// Create a new insurance
export const createInsurance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const contract = req.file;

    console.log("name: ", name);

    if (!name) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const insurance = await Insurance.create({
      name,
      contract: contract?.path,
    });

    res.status(201).json(insurance);
  } catch (error) {
    next(error);
  }
};

// Get all insurances
export const getInsurances = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const insurances = await Insurance.findAll({
      include: {
        model: Service,
        as: "services",
        through: { attributes: ["coveragePercentage"] },
      },
    });
    res.status(200).json(insurances);
  } catch (error) {
    next(error);
  }
};

// Get all user insurances
export const getUserInsurances = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const patient = await Patient.findOne({ where: { userId } });
    const patientInsurances = await PatientInsurance.findAll({
      where: { patientId: patient?.id },
      include: {
        model: Insurance,
      },
    });
    const userInsurances = patientInsurances.map(
      (patientInsurance: extendedPatientInsurance | null) =>
        patientInsurance?.insurance
    );
    res.status(200).json(userInsurances);
  } catch (error) {
    next(error);
  }
};

// Get a single insurance by ID
export const getInsuranceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const insurance = await Insurance.findByPk(id, {
      include: {
        model: Service,
        as: "services",
        through: { attributes: ["coveragePercentage"] },
      },
    });
    if (insurance) {
      res.status(200).json(insurance);
    } else {
      return res.status(404).json({ message: "Insurance not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update an insurance
export const updateInsurance = async (
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

    const insurance = await Insurance.findByPk(id);
    if (insurance) {
      await insurance.update(data);
      res.status(200).json(insurance);
    } else {
      return res.status(404).json({ message: "Insurance not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete an insurance
export const deleteInsurance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const insurance = await Insurance.findByPk(id);
    if (insurance) {
      await insurance.destroy();
      res.status(204).json();
    } else {
      return res.status(404).json({ message: "Insurance not found" });
    }
  } catch (error) {
    next(error);
  }
};

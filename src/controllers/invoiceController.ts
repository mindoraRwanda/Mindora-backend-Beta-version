import { Request, Response, NextFunction } from "express";
import Invoice from "../database/models/invoice";
import Patient from "../database/models/patient";
import Insurance from "../database/models/insurance";
import Service from "../database/models/service";
import User from "../database/models/user";
import { calculateServiceCoverage } from "../utils/insuranceCoverageCalc";

interface ExtendedPatient extends Patient {
  insurances?: Insurance[];
}

export const createInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, services, dueDate } = req.body;

    // Validate required fields
    if (!userId || !services || !dueDate) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    // Fetch patient and their insurances
    const patient: ExtendedPatient | null = await Patient.findOne({
      where: { userId },
      include: { model: Insurance, as: "insurances" },
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found!" });
    }

    // Fetch services and related insurance info
    const servicePromises = services.map((id: string) =>
      Service.findByPk(id, {
        include: {
          model: Insurance,
          as: "insurances",
          through: { attributes: ["coveragePercentage"] },
        },
      })
    );

    const serviceResults = await Promise.allSettled(servicePromises);
    const serviceErrors = serviceResults.filter(
      (result) => result.status === "rejected"
    );
    if (serviceErrors.length > 0) {
      return res.status(500).json({ message: "Error fetching services" });
    }

    // Filter fulfilled services and process them
    const servicesData = serviceResults
      .filter(
        (result): result is PromiseFulfilledResult<any> =>
          result.status === "fulfilled"
      )
      .map((result) => result.value);

    const insuranceIDs = patient.insurances?.map((insurance) => insurance.id);
    let priceCoverage = { clientCoverage: 0, insuranceCoverage: 0 };

    // Calculate coverage for the services
    const updatedServices = await calculateServiceCoverage(
      servicesData,
      insuranceIDs,
      priceCoverage
    );

    // Create the invoice with the calculated data
    const invoice = await Invoice.create({
      userId,
      services: updatedServices,
      clientCoverage: priceCoverage.clientCoverage,
      insuranceCoverage: priceCoverage.insuranceCoverage,
      status: "Pending",
      dueDate,
    });

    return res.status(201).json(invoice);
  } catch (error) {
    next(error);
  }
};

export const getInvoices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const invoices = await Invoice.findAll({
      include: { model: User, as: "user" },
    });
    if (invoices.length > 0) {
      return res.status(200).json(invoices);
    } else {
      return res.status(404).json({ message: "Invoices not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const getUserInvoices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const invoices = await Invoice.findAll({
      where: { userId },
      include: { model: User, as: "user" },
    });
    if (invoices.length > 0) {
      return res.status(200).json(invoices);
    } else {
      return res.status(404).json({ message: "User invoices not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const getInvoiceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const invoice = await Invoice.findByPk(id);

    if (invoice) {
      return res.status(200).json(invoice);
    } else {
      return res.status(404).json({ message: "Invoice not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const updateInvoice = async (
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

    const invoice = await Invoice.findByPk(id);

    if (invoice) {
      await invoice.update(data);
      return res.status(200).json(invoice);
    } else {
      return res.status(404).json({ message: "Invoice not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const invoice = await Invoice.findByPk(id);

    if (invoice) {
      await invoice.destroy();
      return res.status(204).json();
    } else {
      return res.status(404).json({ message: "Invoice not found" });
    }
  } catch (error) {
    next(error);
  }
};

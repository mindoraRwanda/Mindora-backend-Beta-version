import { Request, Response, NextFunction } from "express";
import Service from "../database/models/service";

// Create a new service
export const createService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, price } = req.body;
    const picture = req.file;
    if (!name || !price) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const service = await Service.create({
      name,
      description,
      price,
      picture: picture?.path,
    });
    res.status(201).json(service);
  } catch (error) {
    next(error);
  }
};

// Get all services
export const getServices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const services = await Service.findAll();
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};

// Get a single service by ID
export const getServiceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const service = await Service.findByPk(id);
    if (service) {
      res.status(200).json(service);
    } else {
      return res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update a service
export const updateService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const picture = req.file;
    const data = req.body;

    if (!id || !data) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const service = await Service.findByPk(id);
    if (service) {
      await service.update({
        ...data,
        picture: picture ? picture?.path : service.picture,
      });
      res.status(200).json(service);
    } else {
      return res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a service
export const deleteService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const service = await Service.findByPk(id);
    if (service) {
      await service.destroy();
      res.status(204).json();
    } else {
      return res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    next(error);
  }
};

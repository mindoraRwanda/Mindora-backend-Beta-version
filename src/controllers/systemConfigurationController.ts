// src/controllers/systemConfigurationController.ts

import { Request, Response } from 'express';
import { upsertSystemConfiguration, deleteSystemConfiguration, getSystemConfiguration, getAllSystemConfigurations } from '../models/SystemConfiguration';

export const createOrUpdateConfiguration = async (req: Request, res: Response) => {
  const { key, value } = req.body;

  if (!key) {
    return res.status(400).json({ error: "Missing parameter(s)!" });
  }

  try {
    const config = await upsertSystemConfiguration({ key, value });
    res.status(200).json(config);
  } catch (err) {
    console.error('Error upserting system configuration:', err);
    res.status(500).json({ error: "Error occurred while upserting system configuration!" });
  }
};

export const deleteConfiguration = async (req: Request, res: Response) => {
  const { key } = req.body;

  if (!key) {
    return res.status(400).json({ error: "Missing parameter(s)!" });
  }

  try {
    const deletedConfig = await deleteSystemConfiguration(key);
    if (!deletedConfig) {
      return res.status(404).json({ error: "Configuration not found or not deleted." });
    }
    res.status(200).json(deletedConfig);
  } catch (err) {
    console.error('Error deleting system configuration:', err);
    res.status(500).json({ error: "Error occurred while deleting system configuration!" });
  }
};

export const getConfiguration = async (req: Request, res: Response) => {
  const { key } = req.query;

  if (!key) {
    return res.status(400).json({ error: "Missing parameter(s)!" });
  }

  try {
    const config = await getSystemConfiguration(key as string);
    if (!config) {
      return res.status(404).json({ error: "Configuration not found." });
    }
    res.status(200).json(config);
  } catch (err) {
    console.error('Error retrieving system configuration:', err);
    res.status(500).json({ error: "Error while retrieving system configuration!" });
  }
};

export const getAllConfigurations = async (req: Request, res: Response) => {
  try {
    const configs = await getAllSystemConfigurations();
    res.status(200).json(configs);
  } catch (err) {
    console.error('Error retrieving all system configurations:', err);
    res.status(500).json({ error: "Error while retrieving all system configurations!" });
  }
};

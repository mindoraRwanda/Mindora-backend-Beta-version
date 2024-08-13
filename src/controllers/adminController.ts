import { Request, Response } from 'express';
import { updateTherapistApproval } from '../models/Therapist';

export const toggleTherapistApproval = async (req: Request, res: Response) => {
  const { therapistId, approved } = req.body;
  try {
    const therapist = await updateTherapistApproval(therapistId, approved);
    if (therapist) {
      res.status(200).json({ message: 'Therapist approval status updated', therapist });
    } else {
      res.status(404).json({ error: 'Therapist not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

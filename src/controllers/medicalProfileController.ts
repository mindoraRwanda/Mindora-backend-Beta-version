import { Request, Response } from 'express';
import { createMedicalProfile, getMedicalProfileByUserId, updateMedicalProfile } from '../models/MedicalProfile';

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
  };
}

export const createProfile = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const { userId } = req.user;
  const profileData = req.body;
  try {
    const profile = await createMedicalProfile({ userId, ...profileData });
    res.status(201).json(profile);
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const { userId } = req.user;
  try {
    const profile = await getMedicalProfileByUserId(userId);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error('Error getting profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const { userId } = req.user;
  const profileData = req.body;
  try {
    const profile = await updateMedicalProfile(userId, profileData);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
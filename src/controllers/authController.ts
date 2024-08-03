import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { createAdmin, getAdminByEmail } from '../models/Admin';
import { createTherapist, getTherapistByEmail } from '../models/Therapist';
import { createNormalUser, getNormalUserByEmail } from '../models/NormalUser';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const generateToken = (id: string, role: string) => {
  return jwt.sign({ userId: id, role }, JWT_SECRET, { expiresIn: '1h' });
};

export const adminSignUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await createAdmin({ id: uuidv4(), email, password: hashedPassword });
    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const therapistSignUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const therapist = await createTherapist({ id: uuidv4(), email, password: hashedPassword, approved: false });
    res.status(201).json(therapist);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const normalUserSignUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createNormalUser({ id: uuidv4(), email, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    let user = await getAdminByEmail(email);
    if (!user) {
      user = await getTherapistByEmail(email);
      if (user && !user.approved) {
        return res.status(403).json({ error: 'Therapist account not approved by admin' });
      }
    }
    if (!user) {
      user = await getNormalUserByEmail(email);
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const role = user.approved !== undefined ? 'therapist' : user.id ? 'admin' : 'user';
    const token = generateToken(user.id, role);
    res.status(200).json({ token, profile: user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

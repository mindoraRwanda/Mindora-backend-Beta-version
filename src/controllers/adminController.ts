import { Request, Response } from 'express';
import { updateTherapistApproval } from '../models/Therapist';
import { getNormalUserByEmail,updateUserByEmail,deleteUserByEmail } from '../models/NormalUser';
import bcrypt from 'bcrypt';

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

export const updateUserAccount = async (req: Request, res: Response) => {
  try{
    const { email ,password, name, username, phone_number } = req.body;
    const user = await getNormalUserByEmail(email);
    if(!user){
      return res.status(404).json({error: 'User not found'});
    }
    const updatedUser= await updateUserByEmail(email,{
      name,
      username,
      phone_number,
      password: await bcrypt.hash(password, 10),
      email,
      profile_picture: ''
    })
    return res.status(200).json({ message: 'User account updated successfully', user: updatedUser });
  }
  catch(error){
    return res.status(500).json({ error: 'An error occurred while updating the user account' });
  }
}

export const deleteUserAccount = async (req:Request, res: Response) =>{
  try{
    const { email } = req.body;
    await deleteUserByEmail(email);
    return res.status(200).json({ message: 'User account deleted successfully' });
  }
  catch(error){
    return res.status(500).json({ error: 'An error occurred while deleting the user account' });
  }
}
import { Request, Response, NextFunction } from "express";
import User from "../database/models/user";
import  Jwt  from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

export const updateAccount = async (req:Request,res:Response) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { username, email, password } = req.body;
        // if (!username &&!email &&!password) {
        //     return res.status(400).json({ message: 'At least one field must be updated' });
        // }
        if (username) {
            user.username = username;
        }
        if (email) {
            user.email = email;
        }
        if (password) {
            user.password = password;
        }
        await user.save();
        // generate JWT token
        const token = Jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '365d' });
        res.json({ user, token });
    }
    catch(error){
}
}

export const deleteAccount = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const user = await User.findByPk(req.params.id);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        await user.destroy();
        user.save();
        res.json({message: 'User deleted successfully'});
    }
    catch(error){
        next(error);
    }
}

export const changeRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { role } = req.body;
        if (!role) {
            return res.status(400).json({ message: 'Role is required' });
        }
        if(role!=='admin' && role!=='therapist' && role!=='patient'){
            return res.status(400).json({ message: 'Invalid role' });
        }
        user.role = role; 

        await user.save();
        res.json(user);
    } catch (error) {
        next(error);
    }
};
export const getAllTherapists = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const therapists = await User.findAll({where: {role: 'therapist'}});
        res.json(therapists);
    } catch (error) {
        next(error);
    }
}
export const getAllPatients = async (req:Request, res: Response, next:NextFunction)=>{
    try {
        const patients = await User.findAll({where: {role: 'patient'}});
        res.json(patients);
    } catch (error) {
        next(error);
    }
}

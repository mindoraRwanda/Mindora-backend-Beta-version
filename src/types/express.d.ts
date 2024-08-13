import { Request } from 'express';
import { Multer } from 'multer';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
      };
      file?: Express.Multer.File;
    }
  }
}
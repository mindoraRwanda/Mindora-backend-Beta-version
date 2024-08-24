// src/@types/express/index.d.ts

import User from "../../database/models/user";
import { UserAttributes } from "../../models/user";

declare global {
  namespace Express {
    interface Request {
      user?: UserAttributes; // or your User type definition
    }
  }
}

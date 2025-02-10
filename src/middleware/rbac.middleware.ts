import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Role, { RoleAttributes } from "../database/models/role";
import Permission from "../database/models/permission";
// import redisClient from "../utils/redisCache.ts";
import { cache } from "../utils/redisCache.ts";

interface RolePermissions extends Role {
  permissions?: Array<Permission>;
}

interface DecodedToken {
  roleId: string;
  role: string;
  id: string;
}

export const authorize = (requiredPermission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json({ message: "Unauthorized: No token provided" });
      }

      const JWT_SECRET = process.env.JWT_SECRET;
      if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not set in environment variables!");
      }

      let decoded: DecodedToken;
      try {
        decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
      } catch (err) {
        return res
          .status(401)
          .json({ message: "Unauthorized: Invalid or expired token" });
      }

      const cacheKey = `role:${decoded.roleId}:permissions`;

      let cachedPermissions;

      // cachedPermissions = await redisClient.get(cacheKey);
      cachedPermissions = await cache.get(cacheKey);

      let permissions: string[];
      if (cachedPermissions) {
        permissions = JSON.parse(cachedPermissions);
        console.log("Cahed permissions:", permissions);
      } else {
        const role: RolePermissions | null = await Role.findByPk(
          decoded.roleId,
          {
            include: [{ model: Permission, as: "permissions" }],
          }
        );

        if (!role) {
          return res
            .status(403)
            .json({ message: "Access denied: User role not found" });
        }

        permissions = role.permissions
          ? role.permissions.map((p) => p.name)
          : [];
        // replace temporirly redisClient with cache
        // await redisClient.set(cacheKey, JSON.stringify(permissions), {
        //   EX: 3600,
        // });
        cache.set(cacheKey, JSON.stringify(permissions));
      }

      if (permissions.includes(requiredPermission)) {
        next();
      } else {
        res.status(403).json({
          message: "Access denied: You are not allowed to perform this action!",
        });
      }
    } catch (err) {
      console.error("RBAC Error:", err);
      next(err);
    }
  };
};

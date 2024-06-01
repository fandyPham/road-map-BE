import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authInterceptor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const pathKey = req.path;
  // If no authorization header is present, return an error
  if (!authHeader) {
    return res.status(401).json({ error: "unauthorize" });
  }

  // Extract the token from the authorization header
  const token = authHeader?.split(" ")[1] || "";

  // Verify the token
  if (authHeader) {
    const decodedUser = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string,
      (err, decoded) => {
        if (err) {
          return res.status(403).json({ error: "Invalid token" });
        }
        // check permission
      }
    );
    (req as any).user = decodedUser;
  }
  next();
};

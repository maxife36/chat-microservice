import { Request, Response, NextFunction } from "express";
import tokenUtils from "../utils/tokenUtils";
import { ForbiddenError } from "../handlers/errors/Errors";
import { JwtPayload } from "jsonwebtoken";

export default async function loggedAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.token;

    console.log("TOKEN  - > ", token );

    if (!token) {
      throw new ForbiddenError();
    }
    
    const decoded = tokenUtils.verifyToken(token);
    req.payload = decoded ;

    console.log("PAYLOAD  - > ", req.payload );
    
    next();
  } catch (error) {
    next(error)
  }
}

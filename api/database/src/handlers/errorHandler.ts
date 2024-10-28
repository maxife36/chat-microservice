import { Request, Response, NextFunction } from "express";
import { ApiError } from "./errors/ApiError";
import { HttpStatusCode } from "./enums";
import { ValidationError } from "./errors/Errors";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    res.status(err.statusCode).json({
      error: true,
      message: err.message,
      details: err.validationErrors,
    });
  } else if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      error: true,
      message: err.message,
    });
  } else {
    console.error(err);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

export default errorHandler;

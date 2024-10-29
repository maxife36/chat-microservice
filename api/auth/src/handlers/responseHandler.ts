import { Response } from "express";
import { HttpStatusCode, SuccessMessage } from "./enums";

type Metadata = {
  message?: SuccessMessage;
  [key: string]: any;
};

export type SuccessResponse = {
  error: boolean;
  data: { [key: string]: any };
  metadata: {
    message?: SuccessMessage;
    timestamp: Date;
    [key: string]: any;
  };
};

export const responseHandler = (
  res: Response,
  data: object = {},
  statusCode: HttpStatusCode = HttpStatusCode.OK,
  metadata: Metadata = { message: SuccessMessage.OPERATION_SUCCESSFUL }
) => {
  res.status(statusCode).json({
    error: false,
    data,
    metadata: {
      ...metadata,
      timestamp: new Date().toISOString(),
    },
  });
};

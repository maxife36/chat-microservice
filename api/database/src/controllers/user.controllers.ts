import { Request, Response, NextFunction } from "express";
import { UpdateUserDto, UserDto, UserFilterDto } from "../dtos/user.dto";
import Models from "../models/index";
import { NotFoundError } from "../handlers/errors/Errors";
import { validate } from "class-validator";
import { ValidationErrorHandler } from "../handlers/validationErrorHandler";
import { HttpStatusCode, SuccessMessage } from "../handlers/enums";
import { responseHandler } from "../handlers/responseHandler";
import checkUniqueFields from "../utils/checkUniqueFields";
import { Op } from "sequelize";

const { User } = Models;

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = (page - 1) * limit;

    const { count, rows } = await User.findAndCountAll({
      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit);

    const metadata = {
      currentPage: page,
      totalPages,
      totalRecords: count,
      limit,
    };

    return responseHandler(res, rows, HttpStatusCode.OK, metadata);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      throw new NotFoundError();
    }

    return responseHandler(res, user);
  } catch (error) {
    next(error);
  }
};

export const getUserFilter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userDto = UserFilterDto.fromPlain(req.query);
    let errors = await validate(userDto);

    if (errors.length > 0) {
      throw ValidationErrorHandler(errors);
    }

    const user = await User.findOne({
      where: {
        [Op.or]:[
          {username : userDto.username ?? ""},
          {email : userDto.email?? ""}
        ]
      }
    });

    if (!user) {
      throw new NotFoundError();
    }

    return responseHandler(res, user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userDto = UserDto.fromPlain(req.body);
    let errors = await validate(userDto);

    if (errors.length > 0) {
      throw ValidationErrorHandler(errors);
    }
    
    errors = await checkUniqueFields(User, userDto)

    if (errors.length > 0) {
      throw ValidationErrorHandler(errors);
    }

    const user = await User.create(userDto);

    return responseHandler(res, user, HttpStatusCode.CREATED, {
      message: SuccessMessage.RESOURCE_CREATED,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    const userDto = UpdateUserDto.fromPlain(req.body);
    let errors = await validate(userDto);

    if (errors.length > 0) {
      throw ValidationErrorHandler(errors);
    }

    errors = await checkUniqueFields(User, userDto)

    if (errors.length > 0) {
      throw ValidationErrorHandler(errors);
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new NotFoundError();
    }

    await user.update(userDto);

    return responseHandler(res, {}, HttpStatusCode.NO_CONTENT, {
      message: SuccessMessage.RESOURCE_UPDATED,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      throw new NotFoundError();
    }

    await user.destroy();
    return responseHandler(res, {}, HttpStatusCode.NO_CONTENT, {
      message: SuccessMessage.RESOURCE_DELETED,
    });
  } catch (error) {
    next(error);
  }
};
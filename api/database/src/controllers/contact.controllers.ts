import { Request, Response, NextFunction } from "express";
import { ContactDto, UpdateContactDto } from "../dtos/contact.dto";
import Models from "../models/index";
import { NotFoundError } from "../handlers/errors/Errors";
import { validate } from "class-validator";
import { ValidationErrorHandler } from "../handlers/validationErrorHandler";
import { responseHandler } from "../handlers/responseHandler";
import { HttpStatusCode, SuccessMessage } from "../handlers/enums";
import checkUniqueFields from "../utils/checkUniqueFields";
import checkPkExist from "../utils/checkPkExist";

const { Contact, User } = Models;

export const getAllContacts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = (page - 1) * limit;

    const { count, rows } = await Contact.findAndCountAll({
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

export const getContactRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const registerId = req.params.id;
    const contact = await Contact.findByPk(registerId);

    if (!contact) {
      throw new NotFoundError();
    }

    return responseHandler(res, contact);
  } catch (error) {
    next(error);
  }
};

export const getUserContacts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = (page - 1) * limit;

    const user = await User.findByPk(userId);

    if (!user) {
      throw new NotFoundError();
    }

    const { count, rows } = await Contact.findAndCountAll({
      where: { userId: userId },
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

export const createContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const contactDto = ContactDto.fromPlain(req.body);
    let errors = await validate(contactDto);

    if (errors.length > 0) {
      throw ValidationErrorHandler(errors);
    }

    errors = await checkUniqueFields(Contact, contactDto);

    if (errors.length > 0) {
      throw ValidationErrorHandler(errors);
    }

    // Verificar que userId y contactId existen en la tabla users
    errors = await checkPkExist(User, contactDto);

    if (errors.length > 0) {
      throw ValidationErrorHandler(errors);
    }

    const contact = await Contact.create(contactDto);

    return responseHandler(res, contact, HttpStatusCode.CREATED, {
      message: SuccessMessage.RESOURCE_CREATED,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const registerId = req.params.id;
    const contactDto = UpdateContactDto.fromPlain(req.body);
    let errors = await validate(contactDto);

    if (errors.length > 0) {
      throw ValidationErrorHandler(errors);
    }

    errors = await checkUniqueFields(Contact, contactDto);

    if (errors.length > 0) {
      throw ValidationErrorHandler(errors);
    }

    // Verificar que contactId existe en la tabla users
    errors = await checkPkExist(User, contactDto);

    if (errors.length > 0) {
      throw ValidationErrorHandler(errors);
    }

    const contact = await Contact.findByPk(registerId);

    if (!contact) {
      throw new NotFoundError();
    }

    await contact.update(contactDto);

    return responseHandler(res, {}, HttpStatusCode.NO_CONTENT, {
      message: SuccessMessage.RESOURCE_UPDATED,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const registerId = req.params.id;
    const contact = await Contact.findByPk(registerId);

    if (!contact) {
      throw new NotFoundError();
    }

    await contact.destroy();

    return responseHandler(res, {}, HttpStatusCode.NO_CONTENT, {
      message: SuccessMessage.RESOURCE_DELETED,
    });
  } catch (error) {
    next(error);
  }
};

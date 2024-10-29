import { Request, Response, NextFunction } from "express";
import userService from "../services/user.service";
import tokenUtils from "../utils/tokenUtils";
import { LoginUserDto, UpdateUserDto, UserDto } from "../dtos/user.dto";
import { validate } from "class-validator";
import { ValidationErrorHandler } from "../handlers/validationErrorHandler";
import { HttpStatusCode, SuccessMessage } from "../handlers/enums";
import { responseHandler } from "../handlers/responseHandler";
import { JwtPayload } from "jsonwebtoken";

class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const userDto = UserDto.fromPlain(req.body);
      let errors = await validate(userDto);

      if (errors.length > 0) {
        throw ValidationErrorHandler(errors);
      }
      
      const user = await userService.register(userDto);

      const { password, ...secureUser } = user;

      return responseHandler(res, secureUser, HttpStatusCode.CREATED, {
        message: SuccessMessage.RESOURCE_CREATED,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const userDto = LoginUserDto.fromPlain(req.body);
      let errors = await validate(userDto);

      if (errors.length > 0) {
        throw ValidationErrorHandler(errors);
      }

      const user = await userService.login(userDto);

      const token = tokenUtils.generateToken(user.id);

      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000*60*60, // 1 hora
      });
      
      return responseHandler(res);
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const userDto = UpdateUserDto.fromPlain(req.body);
        let errors = await validate(userDto);
  
        if (errors.length > 0) {
          throw ValidationErrorHandler(errors);
        }
    
      const payload = req.payload as JwtPayload ; 

      await userService.updateProfile(payload.userId, userDto);

      return responseHandler(res, {}, HttpStatusCode.NO_CONTENT, {
        message: SuccessMessage.RESOURCE_UPDATED,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();

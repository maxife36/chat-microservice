import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { LoginUserDto, UpdateUserDto, UserDto } from "../dtos/user.dto";
import {
  ExternalApiError,
  ExternalserviceError,
} from "../handlers/errors/ExternalApiError";
import { SuccessResponse } from "../handlers/responseHandler";
import { ForbiddenError } from "../handlers/errors/Errors";

dotenv.config();

const DATABASE_PORT = process.env.DATABASE_CONTAINER_PORT;

const databaseServiceUrl = `http://database:${DATABASE_PORT}/api`;

class UserService {
  async register(userDto: UserDto) {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);

    userDto.password = hashedPassword;
    
    const url = `${databaseServiceUrl}/users`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDto),
    });
    
    if (!response.ok) {
      const errorData: ExternalserviceError = await response.json();

      throw new ExternalApiError(errorData);
    }

    const user: SuccessResponse = await response.json();

    return user.data;
  }

  async login(userDto: LoginUserDto) {
    const url = `${databaseServiceUrl}/users/filter?email=${userDto.email}`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorData: ExternalserviceError = await response.json();
      throw new ExternalApiError(errorData);
    }

    const user: SuccessResponse = await response.json();

    const isPasswordCorrect = await bcrypt.compare(
      userDto.password,
      user.data.password
    );

    if (!isPasswordCorrect) throw new ForbiddenError();

    return user.data;
  }

  async updateProfile(userId: string, userDto: UpdateUserDto) {
    
    if (userDto.password) {
      const hashedPassword = await bcrypt.hash(userDto.password, 10);
  
      userDto.password = hashedPassword;
    }

    const url = `${databaseServiceUrl}/users/${userId}`;

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDto),
    });

    if (!response.ok) {
      const errorData: ExternalserviceError = await response.json();
      throw new ExternalApiError(errorData);
    }
  }
}

export default new UserService();

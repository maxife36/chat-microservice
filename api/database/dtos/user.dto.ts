import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { plainToClass } from "class-transformer";

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  username!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 50) // Ejemplo de longitud mínima para una contraseña
  password!: string;

  static fromPlain(plain: object): UserDto {
    return plainToClass(UserDto, plain);
  }
}

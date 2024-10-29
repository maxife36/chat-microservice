import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
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
  @Length(60) 
  password!: string;

  static fromPlain(plain: object): UserDto {
    return plainToClass(UserDto, plain);
  }
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(1, 50)
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(60)
  password?: string;

  static fromPlain(plain: object): UpdateUserDto {
    return plainToClass(UpdateUserDto, plain);
  }
}

export class UserFilterDto {
  @IsOptional()
  @IsString()
  @Length(1, 50)
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  static fromPlain(plain: object): UserFilterDto {
    return plainToClass(UserFilterDto, plain);
  }
}


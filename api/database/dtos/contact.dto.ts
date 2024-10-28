import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { plainToClass } from "class-transformer";

export class ContactDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId!: string;
  
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  contactId!: string;

  static fromPlain(plain: object): ContactDto {
    return plainToClass(ContactDto, plain);
  }
}

export class UpdateContactDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  contactId!: string;

  static fromPlain(plain: object): UpdateContactDto {
    return plainToClass(UpdateContactDto, plain);
  }
}

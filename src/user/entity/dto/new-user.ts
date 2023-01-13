import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, isPhoneNumber, IsString, Length, Max, MaxLength, maxLength, Min, MinLength } from "class-validator";

export class NewUserDto{
    @IsString()
    name:string;

   @IsNumber()
   @IsPhoneNumber()
   phoneNumber:number;

    @IsEmail()
    email:string;

    @IsNotEmpty()
    @MinLength(8)   
    @MaxLength(16)
    password:string
}
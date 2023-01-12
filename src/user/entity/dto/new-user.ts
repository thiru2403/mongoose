import { IsEmail, IsNotEmpty, IsNumber, IsString, Max, MaxLength, maxLength, Min, MinLength } from "class-validator";

export class NewUserDto{
    @IsString()
    name:string;

   @IsNumber()
   phoneNumber:number;

    @IsEmail()
    email:string;

    @IsNotEmpty()
    @MinLength(8)   
    @MaxLength(16)
    password:string
}
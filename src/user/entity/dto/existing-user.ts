import { IsEmail, IsNotEmpty, IsNumber, IsOptional, MaxLength, MinLength } from "class-validator";

export class ExistingUserDto{
    
   
    @IsEmail()
    @IsOptional()
    email:string;

    
    @IsNumber()
    @IsOptional()
    phoneNumber:number;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(16)
    password:string;
}
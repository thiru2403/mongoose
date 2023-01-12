import { Body, Controller, forwardRef, Post,Inject, Res, UsePipes, Get } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { ValidationPipe } from '@nestjs/common/pipes';
import { response } from 'express';
import { ExistingUserDto } from 'src/user/entity/dto/existing-user';
import { NewUserDto } from 'src/user/entity/dto/new-user';
import { UserDetails } from 'src/user/entity/user.details.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor( private AuthService:AuthService){}

    @Post('register')
    @UsePipes(ValidationPipe)
    async register(@Res() response,@Body() user:NewUserDto):Promise<UserDetails | null>{
        try{
            let register = await this.AuthService.newRegister(user)
            return response.status(HttpStatus.CREATED).json({
                sucess:true, data:[{register}], statusCode:'201 Created'
            })
        }catch(err){
            return response.status(HttpStatus.BAD_REQUEST).json({
                sucess:false, data:[err.message], statusCode:'400 BadRequest'
            })
        }
    }

    
    @Post('login')
    @UsePipes(ValidationPipe)
    async login(@Res() response,@Body() user:ExistingUserDto):Promise<{token:string}| null>{
        try{
            let login = await this.AuthService.login(user)
            return response.status(HttpStatus.CREATED).json({
                sucess:true, data:[{login}], statusCode:'201 Created'
            })
        }catch(err){
            return response.status(HttpStatus.BAD_REQUEST).json({
                sucess:false, data:[err.message], statusCode:'400 BadRequest'
            })
        }
    }

 
}

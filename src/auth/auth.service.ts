import { forwardRef, Injectable, Inject } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { NewUserDto } from 'src/user/entity/dto/new-user';
import { UserDetails } from 'src/user/entity/user.details.interface';
//import {user} from '../user/entity/user.details.interface'
import { ExistingUserDto } from 'src/user/entity/dto/existing-user';
import { JwtService } from '@nestjs/jwt/dist';





@Injectable()
export class AuthService {
    constructor( private UserService: UserService, private jwtService: JwtService){}

async hashedPassword(password:string):Promise<string>{
    return bcrypt.hash(password, 10);
}

async newRegister(user:NewUserDto):Promise<UserDetails| null | string>{

    const {name, phoneNumber,email, password} = user
    
    const phone = await this.UserService.findbyPhoneNumber(phoneNumber)
    if(phone) return 'already resgister this number'

    const existingUser = await this.UserService.findByEmail(email)

    if( existingUser) return 'Email Token! Already Resgister this Email'

    const hashedPassword = await this.hashedPassword(password)

    const newUser = await this.UserService.create(name, phoneNumber,email, hashedPassword)

    return await this.UserService._getUserDetails(newUser)
     
}

async doesPasswordMatch(password:string, hashedPassword:string):Promise<boolean>{
    return bcrypt.compare(password, hashedPassword)
}

async validateUser(phoneNumber:number, email:string,password:string):Promise<UserDetails | null>{
    
    if(!phoneNumber && !email)  return null;
       if(! password)  return null;
       if (phoneNumber)
        return await this.UserService.findbyPhoneNumber(phoneNumber)
        else if (email) {
            let user = await this.UserService.findByEmail(email)
            const doesPasswordMatch  =await this.doesPasswordMatch(password,user.password)
           if(!doesPasswordMatch) return null

             return await this.UserService._getUserDetails(user)
        }
}

async  login(existingUser:ExistingUserDto):Promise<{token:string} | null>{
    const{phoneNumber,email,password} = existingUser;
    const user = await this.validateUser(phoneNumber,email,password)
     
    if(!user) return null;
    const jwt = await this.jwtService.signAsync({user})
    return {token:jwt}
}

}

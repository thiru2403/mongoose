import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewUserDto } from './entity/dto/new-user';
import { UserDetails } from './entity/user.details.interface';
import { UserDocumment } from './entity/user.schema';

@Injectable()
export class UserService {
    find() {
        throw new Error('Method not implemented.');
    }
;
    
       constructor( @InjectModel('User') private UserModel:Model<UserDocumment> ){}

_getUserDetails(user:UserDocumment):UserDetails{
    return{
        id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        email: user.email
    }
}
async findbyPhoneNumber(phoneNumber:number):Promise<UserDetails|null>{
    const pn = await this.UserModel.findOne({phoneNumber}).exec()
    if(!pn) return null;
    return this._getUserDetails(pn)
}
async findByEmail(email:string):Promise<UserDocumment| null >{
    return await this.UserModel.findOne({email}).exec()
}

async findById(id:string):Promise<UserDocumment| null | any>{
   const user = await this.UserModel.findById(id).exec();
   if(!user) return null;
   return this._getUserDetails(user);
}

 async create(name:string, phoneNumber:number,email:string, hashedPassword: string):Promise<UserDocumment | null>{
    const newUser = new this.UserModel({
        name,
        phoneNumber,
        email,
        password:hashedPassword,
    })
    return newUser.save()
 }

}

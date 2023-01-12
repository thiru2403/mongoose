import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";  


export type UserDocumment = User & Document;

@Schema()
export class User{
    static password(password: string, password1: any) {
        throw new Error('Method not implemented.');
    }
    @Prop({required: true})
    name:string;

    @Prop({required: true, unique: true})
    phoneNumber:number;

    @Prop({required: true, unique: true})
    email:string;

    
    @Prop({required:true})
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDto } from './entity/dto';
import { ProductDocument } from './entity/product.schema';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private productModel: Model<ProductDocument>){}


    create(data:ProductDto):Promise<ProductDocument>{
      const newProduct= new this.productModel(data); 
        return newProduct.save()
   
    }
    
    async findAll():Promise<ProductDocument[]>{
        return await this.productModel.find().exec()
    }

    
    async getOne(id:string):Promise<ProductDocument>{
        return await this.productModel.findById(id).exec()
    }

   async update( id:string,data:ProductDto):Promise<ProductDocument  | null>{  
   return await this.productModel.findOneAndUpdate({id:id},data,{new:true})

}

async delete(id:string):Promise<ProductDocument | null>{
return await this.productModel.findOneAndDelete({id:id})
}

   
}


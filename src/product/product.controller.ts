import { Controller, Delete, Get, Param, Patch, Put, UseGuards } from '@nestjs/common';
import { Body, Post, Res, UsePipes } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { JwtAuthGuard, } from '../auth/guards/jwt-guards';
import { ProductDto } from './entity/dto';
import { ProductDocument } from './entity/product.schema';
import { ProductService } from './product.service';



@UsePipes(JwtAuthGuard)
@Controller('product')
export class ProductController {
    constructor(private productService:ProductService){}

    @Post()
    @UsePipes(ValidationPipe)
    async createProduct(@Res() response,@Body()data:ProductDto):Promise<ProductDocument>{
      console.log(data);
      
      try{
        let pro = await this.productService.create(data)
        return response.status(HttpStatus.CREATED).json({
            sucess: true, data:[{pro}] , statusCode:'201 Created'
        })

      }catch(err){
        return response.status(HttpStatus.BAD_REQUEST).json({
            sucess:false, data:[err.message], statusCode:'400 Bad_Request'
        })
      }
    }

    @Get()
   
    async findAllproduct(@Res() response):Promise<ProductDocument[]>{
      try{
        let pro = await this.productService.findAll()
        return response.status(HttpStatus.CREATED).json({
            sucess: true, data:[{pro}] , statusCode:'201 Created'
        })

      }catch(err){
        return response.status(HttpStatus.BAD_REQUEST).json({
            sucess:false, data:[err.message], statusCode:'400 Bad_Request'
        })
      }
    }
  
   
    @Get(':id')
    async getUser(@Res() response,@Param('id') id:string):Promise<ProductDocument | null>{
    console.log(id);
try{
    let Id= await this.productService.getOne(id);
    return response.status(HttpStatus.CREATED).json({
        sucess: true, data:[{Id}], statusCode:'200 created'

    })
    
}catch(err){
    return response.status(HttpStatus.BAD_REQUEST).json({
        sucess: false, data:[err.message], statusCode:'400 BadRequest'
    })
}
 }
   
 @Patch(":id")
 async updateOne(@Res() response,  @Param('id') id:string,@Body() data:ProductDto,):Promise<ProductDocument  | null>{
  try{
    let update = await this.productService.update(id,data)
    return response.status(HttpStatus.CREATED).json({
      sucess: true, data:[{update}] ,  statusCode:'200 Created'
    })
  }catch(err){
    return response.status(HttpStatus.BAD_REQUEST).json({
    sucess: false, data:[err.message],  statusCode:'400 BadRequest'
    })
  }
 }
 
 @Delete(':id')
 async deleteOneId(@Res() response,@Param('id') id:string):Promise<ProductDocument>{
  try{
    let del= await this.productService.delete(id)
    return response.status(HttpStatus.CREATED).json({
      sucess: true, data:[{del}],  statusCode: '200 Created'
    })
  }catch(err){
    return response.status(HttpStatus.BAD_REQUEST).json({
      sucess: false, data:[err.message], statusCode:'400 BadRequest'
    })
  }
 }
 
  }

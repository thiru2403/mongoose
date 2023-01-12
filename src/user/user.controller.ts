import { Controller, forwardRef, Inject } from '@nestjs/common';
import { Get, Param, Res } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { UserDetails } from './entity/user.details.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor( private UserService:UserService){}

    @Get(':id')
    async getUser(@Res() response,@Param('id') id:string):Promise<UserDetails | null>{
try{
    let userId= await this.UserService.findById(id);
    return response.status(HttpStatus.CREATED).json({
        sucess: true, data:[{userId}], statusCode:'200 created'
    })
}catch(err){
    return response.status(HttpStatus.BAD_REQUEST).json({
        sucess: false, data:[err.message], statusCode:'400 BadRequest'
    })
}
    }
}

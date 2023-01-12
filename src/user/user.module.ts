import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UserSchema } from './entity/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports:[MongooseModule.forFeature([{name:'User', schema:UserSchema}]), ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}

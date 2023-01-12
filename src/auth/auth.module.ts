import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Jwtstrategy } from './guards/jwt-strategy';
import { JwtAuthGuard } from './guards/jwt-guards';

@Module({
  imports: [ UserModule, JwtModule.registerAsync({
    useFactory:()=> ({
      secret: ' secret',
      signOptions:{ expiresIn:'3600s'}
      
    })
  })],
  controllers: [AuthController],
  providers: [AuthService,JwtAuthGuard,Jwtstrategy]
})
export class AuthModule {}

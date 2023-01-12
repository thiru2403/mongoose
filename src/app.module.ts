import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { KafkaModule } from './kafka/kafka.module';
// import { TestConsumer } from './kafka/test.consumer';

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true}),MongooseModule.forRoot('mongodb://localhost:27017/mongoose'),ProductModule, forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    KafkaModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

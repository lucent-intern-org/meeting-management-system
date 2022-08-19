import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
const settings = require('../ormconfig.json');

@Module({
  imports: [TypeOrmModule.forRoot(settings),UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

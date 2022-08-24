import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Groups } from '../entities/Groups';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';

@Module({
  imports: [TypeOrmModule.forFeature([Groups])],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}

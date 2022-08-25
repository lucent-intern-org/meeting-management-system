import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rooms } from '../entities/Rooms';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rooms])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { RoomModule } from './room/room.module';
import { MeetingModule } from './meeting/meeting.module';
import { ParticipantService } from './participant/participant.service';
import { ParticipantModule } from './participant/participant.module';
const settings = require('../ormconfig.json');

@Module({
  imports: [TypeOrmModule.forRoot(settings),UserModule, GroupModule, RoomModule, MeetingModule, ParticipantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

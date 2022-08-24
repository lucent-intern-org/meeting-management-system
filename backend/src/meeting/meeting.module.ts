import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meetings } from '../entities/Meetings';
import { Participants } from '../entities/Participants';
import { ParticipantService } from '../participant/participant.service';
import { MeetingController } from './meeting.controller';
import { MeetingService } from './meeting.service';

@Module({
  imports: [TypeOrmModule.forFeature([Meetings, Participants])],
  controllers: [MeetingController],
  providers: [MeetingService, ParticipantService],
})
export class MeetingModule {}

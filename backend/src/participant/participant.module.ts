import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participants } from '../entities/Participants';
import { ParticipantController } from './participant.controller';
import { ParticipantService } from './participant.service';

@Module({
  imports: [TypeOrmModule.forFeature([Participants])],
  controllers: [ParticipantController],
  providers: [ParticipantService]
})
export class ParticipantModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participants } from '../entities/Participants';

@Injectable()
export class ParticipantService {
    constructor(
        @InjectRepository(Participants)
        private participantRepository: Repository<Participants>,
    ){}

    async getParticipant(meetingId){
        let participant = await this.participantRepository.find({where:{meetingId},
        });
        return participant;
    }
    async getAll(){
        let participant = await this.participantRepository.find();
        return participant;
    }
    async createParticipant(meetingId,slackId){
        await this.participantRepository.save({meetingId:meetingId,slackId:slackId});

    }
    async deleteParticipant(participant){
        await this.participantRepository.delete(participant);
    }
    async getCount(){
        return await this.participantRepository.count();
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rooms } from '../entities/Rooms';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(Rooms)
        private roomRepository: Repository<Rooms>,
    ){}

    async getRoom(roomId){
        let room = await this.roomRepository.findOne({where:{roomId},
        });
        return room;
    }
    async getAll(){
        let room = await this.roomRepository.find();
        return room;
    }
    async createRoom(count,room){
        await this.roomRepository.save({roomId:count,roomColor:room.roomColor,roomName:room.roomName});

    }
    async updateRoom(room){
        await this.roomRepository.update(room.roomId,room);
    }
    async deleteRoom(count,roomId){
        await this.roomRepository.delete({roomId : roomId});
        for (let index = roomId+1; index <= count; index++) {
            await this.roomRepository.update(index,{roomId : index-1});
            
        }
    }
    async getCount(){
        return await this.roomRepository.count();
    }
}

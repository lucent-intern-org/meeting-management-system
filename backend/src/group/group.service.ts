import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Groups } from '../entities/Groups';

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Groups)
        private groupRepository: Repository<Groups>,
    ){}

    async getGroup(groupId){
        let group = await this.groupRepository.findOne({where:{groupId},
        });
        return group;
    }
    async getAll(){
        let group = await this.groupRepository.find();
        return group;
    }
    async createGroup(groupName){
        let count=await this.groupRepository.count();
        console.log(count);
        await this.groupRepository.save({groupId:count,groupName:groupName});

    }
    async updateGroup(group){
        await this.groupRepository.update(group.groupId,{groupName:group.groupName});
    }
    async deleteGroup(groupId){
        let count=await this.groupRepository.count();
        await this.groupRepository.delete({groupId : groupId});
        for (let index = groupId+1; index <= count; index++) {
            await this.groupRepository.update(index,{groupId : index-1});
            
        }
    }
}

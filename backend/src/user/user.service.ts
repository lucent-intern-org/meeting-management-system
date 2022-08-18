import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
    ){}

    async getUser(email:string){
        let user = await this.userRepository.findOne({where:{email},
        })
        return user;
    }
    async getUserAll(){
        let user = await this.userRepository.find();
        return user;
    }
}

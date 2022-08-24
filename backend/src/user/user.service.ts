import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/Users';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async getEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }
  async getSlack(slackId: string) {
    const user = await this.userRepository.findOne({ where: { slackId } });
    return user;
  }
  async getGroup(groupId) {
    const user = await this.userRepository.find({ where: { groupId } });
    return user;
  }
  async getAll() {
    const user = await this.userRepository.find();
    return user;
  }
  async createUser(user) {
    await this.userRepository.save(user);
  }
  async updateUser(slackId, user) {
    await this.userRepository.update(slackId, user);
  }
  async deleteUser(slackId) {
    await this.userRepository.delete({ slackId: slackId });
  }
}

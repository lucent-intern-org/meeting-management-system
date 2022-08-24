import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Meetings } from '../entities/Meetings';

@Injectable()
export class MeetingService {
  constructor(
    @InjectRepository(Meetings)
    private meetingRepository: Repository<Meetings>,
  ) {}

  async getDate(date: string) {
    const meeting = await this.meetingRepository.find({ where: { date } });
    return meeting;
  }
  async getMeeting(meeting) {
    return await this.meetingRepository.findOne({
      where: {
        roomId: meeting.roomId,
        date: meeting.date,
        startTime: meeting.startTime,
        endTime: meeting.endTime,
        title: meeting.title,
        content: meeting.content,
        repeat: meeting.repeat,
      },
    });
  }
  async getAll() {
    const meeting = await this.meetingRepository.find();
    return meeting;
  }
  async createMeeting(date, meeting) {
    return await this.meetingRepository.save({
      roomId: meeting.roomId,
      date: date,
      startTime: meeting.startTime,
      endTime: meeting.endTime,
      title: meeting.title,
      content: meeting.content,
      repeat: meeting.repeat,
    });
  }
  async updateMeeting(meeting) {
    await this.meetingRepository.save(meeting);
  }
  async deleteMeeting(meeting) {
    await this.meetingRepository.delete(meeting.meetingId);
  }
  async getCount() {
    return await this.meetingRepository.count();
  }
}

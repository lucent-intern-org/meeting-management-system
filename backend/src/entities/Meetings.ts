import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Participants } from './Participants';

@Index('meetingId_UNIQUE', ['meetingId'], { unique: true })
@Entity('meetings', { schema: 'meeting_management' })
export class Meetings {
  @PrimaryGeneratedColumn({ type: 'int', name: 'meetingId', unsigned: true })
  meetingId: number;

  @Column('int', { name: 'roomId' })
  roomId: number;

  @Column('date', { name: 'date' })
  date: string;

  @Column('varchar', { name: 'startTime', length: 10 })
  startTime: string;

  @Column('varchar', { name: 'endTime', length: 10 })
  endTime: string;

  @Column('varchar', { name: 'title', length: 45 })
  title: string;

  @Column('varchar', { name: 'content', length: 200 })
  content: string;

  @Column('varchar', { name: 'repeat', length: 20 })
  repeat: string;

  @OneToMany(() => Participants, (participants) => participants.meeting)
  participants: Participants[];
}

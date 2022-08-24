import { Column, Entity, Index } from 'typeorm';

@Index('roomId_UNIQUE', ['roomId'], { unique: true })
@Entity('rooms', { schema: 'meeting_management' })
export class Rooms {
  @Column('int', { primary: true, name: 'roomId', unsigned: true })
  roomId: number;

  @Column('varchar', { name: 'roomColor', nullable: true, length: 45 })
  roomColor: string | null;

  @Column('varchar', { name: 'roomName', length: 45 })
  roomName: string;
}

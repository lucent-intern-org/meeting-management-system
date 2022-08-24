import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("roomId_UNIQUE", ["roomId"], { unique: true })
@Entity("rooms", { schema: "meeting_management" })
export class Rooms {
  @PrimaryGeneratedColumn({ type: "int", name: "roomId", unsigned: true })
  roomId: number;

  @Column("varchar", { name: "roomName", length: 45 })
  roomName: string;

  @Column("varchar", { name: "roomColor", nullable: true, length: 45 })
  roomColor: string | null;
}

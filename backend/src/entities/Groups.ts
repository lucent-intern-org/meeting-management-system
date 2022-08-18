import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("groupId_UNIQUE", ["groupId"], { unique: true })
@Entity("groups", { schema: "meeting_management" })
export class Groups {
  @PrimaryGeneratedColumn({ type: "int", name: "groupId", unsigned: true })
  groupId: number;

  @Column("varchar", { name: "groupName", length: 45 })
  groupName: string;
}

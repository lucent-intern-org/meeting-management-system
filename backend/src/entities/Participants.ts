import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Meetings } from "./Meetings";

@Entity("participants", { schema: "meeting_management" })
export class Participants {
  @Column("int", { primary: true, name: "meetingId", unsigned: true })
  meetingId: number;

  @Column("varchar", { primary: true, name: "slackId", length: 65 })
  slackId: string;

  @ManyToOne(() => Meetings, (meetings) => meetings.participants, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "meetingId", referencedColumnName: "meetingId" }])
  meeting: Meetings;
}

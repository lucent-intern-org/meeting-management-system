import { Column, Entity } from "typeorm";

@Entity("users", { schema: "meeting_management" })
export class Users {
  @Column("varchar", { primary: true, name: "slackId", length: 65 })
  slackId: string;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @Column("varchar", { name: "email", length: 65 })
  email: string;

  @Column("int", { name: "groupId", nullable: true })
  groupId: number | null;

  @Column("varchar", { name: "role", nullable: true, length: 45 })
  role: string | null;
}

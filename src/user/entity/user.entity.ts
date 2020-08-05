import { Entity, Column } from "typeorm";
import { Base } from "src/shared/entities/_base.entity";

@Entity()
export class User extends Base {

  @Column()
  lastName: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  age: number;
}
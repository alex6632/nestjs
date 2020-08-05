import { User } from "../entity/user.entity";
import { UpdateResult } from "typeorm";

export interface UserInterface {
  getAll(): Promise<Array<User>>;
  get(pId: number): Promise<User>;
  post(pUser: User): Promise<User>;
  put(pUser: User): Promise<User>;
  delete(pId: number): Promise<void>;
}
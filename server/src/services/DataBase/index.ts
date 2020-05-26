import { Connection } from "typeorm";

export default class DataBase {
  constructor(private readonly instance: Connection) {}

  public get(): Connection {
    return this.instance;
  }
}
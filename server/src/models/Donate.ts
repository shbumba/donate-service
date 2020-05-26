import {
  Entity,
  Column,
  CreateDateColumn,
  ObjectIdColumn,
  ObjectID,
  OneToOne,
} from "typeorm";
import { Currency } from "./Currency";
import { CollectionTypes } from "src/services/DataBase/types";

@Entity({
  name: CollectionTypes.Currencies
})
export class Donate {
  @ObjectIdColumn()
  public id!: ObjectID;

  @Column("int")
  public amount!: number;

  @OneToOne(() => Currency, (currency) => currency.code)
  public currency!: string;

  @CreateDateColumn()
  public createdDate!: string;
}

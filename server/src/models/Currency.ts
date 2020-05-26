import { Entity, Column, ObjectID, ObjectIdColumn } from "typeorm";
import { CollectionTypes } from "src/services/DataBase/types";

@Entity({
  name: CollectionTypes.Currencies
})
export class Currency {
  @ObjectIdColumn()
  public id!: ObjectID;

  @Column("text")
  public name!: string;

  @Column({
    type: "text",
    unique: true,
  })
  public code!: string;

  @Column("text")
  public symbol!: string;

  @Column("float")
  public rate!: number;
}

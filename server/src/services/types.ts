import DataBase from "./DataBase";

export enum Services {
  DataBase = "database"
}

export type ServiceMap = {
  [Services.DataBase]: InstanceType<typeof DataBase>
}
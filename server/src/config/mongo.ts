import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions";
import ormConfig from "../../ormconfig.json";

const mongo: MongoConnectionOptions = ormConfig as MongoConnectionOptions;

export default mongo;

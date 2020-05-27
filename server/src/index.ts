import "reflect-metadata";
import Koa from "koa";
import helmet from "koa-helmet";
import { createConnection } from "typeorm";
import { createKoaServer } from "routing-controllers";

import config from "./config";
import controllerOptions from "./controllers";
import DataBase from "./services/DataBase";
import { Services } from "./services/types";
import { DI } from "./services";

createConnection(config.mongo)
  .then(async (connection) => {
    DI.set(Services.DataBase, new DataBase(connection));

    const app: InstanceType<typeof Koa> = createKoaServer(controllerOptions);

    app.use(helmet());
    app.listen(config.port);
  })
  .catch((error) => console.log("Error: ", error));

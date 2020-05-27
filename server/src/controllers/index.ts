import { RoutingControllersOptions } from "routing-controllers";
import { DonateController } from "./DonateController";
import { CurrencyController } from "./CurrencyController";
import config from "src/config";

const controllers: RoutingControllersOptions = {
  cors: config.cors,
  routePrefix: "/api/v1",
  controllers: [DonateController, CurrencyController],
};

export default controllers;

import { RoutingControllersOptions } from "routing-controllers";
import { DonateController } from "./DonateController";
import { CurrencyController } from "./CurrencyController";

const controllers: RoutingControllersOptions = {
  routePrefix: "/api/v1",
  controllers: [DonateController, CurrencyController],
};

export default controllers;

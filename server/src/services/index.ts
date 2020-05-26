import { Container } from "typedi";
import { ServiceMap, Services } from "./types";
import { Override } from "src/types/utils";

declare class OverrideMethod {
  static get<K extends Services>(type: K): ServiceMap[K];
}

type DIContainer = Override<typeof Container, typeof OverrideMethod>

const DI = Container as DIContainer;

export {
  DI,
  Services
};
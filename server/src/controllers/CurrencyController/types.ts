import { Currency } from "src/models/Currency";

export type ReturnedCurrency = Pick<Currency, Exclude<keyof Currency, "id">>;

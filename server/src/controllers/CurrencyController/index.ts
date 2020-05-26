import { Get, JsonController } from "routing-controllers";
import { Services } from "src/services/types";
import { Currency } from "src/models/Currency";
import { ReturnedCurrency } from "./types";
import { DI } from "src/services";
import ROUTES from "src/config/routes";

@JsonController()
export class CurrencyController {
  @Get(ROUTES.CURRENCIES)
  public async getList(): Promise<ReturnedCurrency[]> {
    const db = DI.get(Services.DataBase).get();

    const currencies = await db.getMongoRepository(Currency).find();

    return currencies.map(({ id, ...rest }) => rest);
  }
}

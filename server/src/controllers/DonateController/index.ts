import {
  JsonController,
  Post,
  Body,
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from "routing-controllers";
import ROUTES from "src/config/routes";
import { PostDonateRequest, PostDonateResponse } from "./types";
import { Donate } from "src/models/Donate";
import { Services, DI } from "src/services";
import { Currency } from "src/models/Currency";

@JsonController()
export class DonateController {
  private async hasCurrency(code: string) {
    const db = DI.get(Services.DataBase).get();

    try {
      await db.getMongoRepository(Currency).findOneOrFail({
        where: {
          code,
        },
      });

      return true;
    } catch {
      //
    }

    return false;
  }

  @Post(ROUTES.DONATE)
  public async createDonate(
    @Body() data: PostDonateRequest
  ): Promise<PostDonateResponse> {
    if (!data.amount) {
      throw new BadRequestError("Incorrect amount");
    }

    if (!(await this.hasCurrency(data.currency))) {
      throw new NotFoundError("Currency waw not found");
    }

    const db = DI.get(Services.DataBase).get();

    const entry = new Donate();

    entry.amount = data.amount;
    entry.currency = data.currency;

    try {
      await db.getMongoRepository(Donate).create(entry);

      return {
        ok: true,
      };
    } catch {
      throw new InternalServerError("Create error");
    }
  }
}

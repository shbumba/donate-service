import { MigrationInterface } from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";
import { CollectionTypes } from "src/services/DataBase/types";
import { Currency } from "src/models/Currency";

type CurrencyMock = Pick<Currency, Exclude<keyof Currency, "id">>;

const currenciesMock: CurrencyMock[] = [
  { name: "US Dollar", code: "USD", symbol: "$", rate: 1 },
  { name: "Euro", code: "EUR", symbol: "€", rate: 0.897597 },
  { name: "British Pound", code: "GBP", symbol: "£", rate: 0.81755 },
  { name: "Russian Ruble", code: "RUB", symbol: "₽", rate: 63.461993 },
];

type CurrencyKeys = keyof CurrencyMock;

export class currencies1590247717096 implements MigrationInterface {
  public async up(queryRunner: MongoQueryRunner): Promise<void> {
    const count = await queryRunner
      .cursor(CollectionTypes.Currencies, {})
      .count(false);

    if (count) {
      return;
    }

    const currencies = currenciesMock.map((currency) => {
      const model = new Currency();

      Object.entries(currency).forEach(([key, value]) => {
        const modelKey = (key as never) as CurrencyKeys;

        model[modelKey] = value as never;
      });

      return model;
    });

    queryRunner.insertMany(CollectionTypes.Currencies, currencies);
  }

  public async down(queryRunner: MongoQueryRunner): Promise<void> {
    queryRunner.dropTable(CollectionTypes.Currencies);
  }
}

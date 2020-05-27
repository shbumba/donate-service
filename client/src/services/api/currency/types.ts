export enum Currencies {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  RUB = 'RUB'
}

export type Currency = {
  symbol: string;
  name: string;
  code: Currencies;
  rate: number;
};

export type GetCurrencyResponse = Currency[];

import { Currencies } from '../currency/types';

export type PostDonateRequest = {
  amount: number;
  currency: Currencies;
};

export type PostDonateResponse = {
  ok: boolean;
};

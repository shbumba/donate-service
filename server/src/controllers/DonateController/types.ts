import { Donate } from "src/models/Donate";

export type PostDonateRequest = {
  amount: Donate["amount"];
  currency: Donate["currency"];
};

export type PostDonateResponse = {
  ok: boolean;
};

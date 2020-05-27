import {
  VuexModule, Module, Mutation,
} from 'vuex-module-decorators';
import api from '@/services/api';
import { Currencies } from '@/services/api/currency/types';
import { Stores } from '../types';

@Module({ name: Stores.Donate, namespaced: true })
class DonateStore extends VuexModule {
  public presets: number[] = [40, 100, 200, 1000, 2500, 5000];

  public amount: number = this.presets[0];

  public currencyCode: Currencies = Currencies.USD;

  public isSending = false;

  public errorMessage: null | string = null;

  public showSuccessDialog = false;

  @Mutation
  public async sendDonate() {
    this.errorMessage = null;
    this.showSuccessDialog = false;
    this.isSending = true;

    try {
      await api.get().postDonate({
        amount: this.amount,
        currency: this.currencyCode,
      });

      this.showSuccessDialog = true;
    } catch {
      this.errorMessage = 'An error has occurred when sending data.';
    } finally {
      this.isSending = false;
    }
  }

  @Mutation
  public hideSuccessDialog() {
    this.showSuccessDialog = false;
  }

  @Mutation
  public setAmount(amount: number) {
    this.amount = amount;
  }

  @Mutation
  public setCurrencyCode(currencyCode: Currencies) {
    this.currencyCode = currencyCode;
  }
}

export default DonateStore;

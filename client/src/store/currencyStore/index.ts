import {
  VuexModule, Module, Mutation, Action,
} from 'vuex-module-decorators';
import api from '@/services/api';
import { GetCurrencyResponse } from '@/services/api/currency/types';
import { Stores } from '../types';

@Module({ name: Stores.Currency, namespaced: true })
class CurrencyStore extends VuexModule {
  public currencies: GetCurrencyResponse = [];

  public isLoading = false;

  public errorMessage: null | string = null;

  @Mutation
  public async fetchCurrency() {
    this.errorMessage = null;
    this.isLoading = true;

    try {
      const result = await api.get().getCurrency();

      this.currencies = result;
    } catch {
      this.errorMessage = 'There was an error when loading the data';
    } finally {
      this.isLoading = false;
    }
  }

  @Action
  public updateName(newName: string): void {
    this.context.commit('setName', newName);
  }
}

export default CurrencyStore;

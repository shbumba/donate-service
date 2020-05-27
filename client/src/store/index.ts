import Vue from 'vue';
import Vuex from 'vuex';
import CurrencyStore from './currencyStore';
import DonateStore from './donateStore';
import { Stores } from './types';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    [Stores.Currency]: CurrencyStore,
    [Stores.Donate]: DonateStore,
  },
});

export default store;

<template>
  <div :class="{ donate: true, 'donate--error': !!errorMessage }">
    <div class="donate__presets" v-if="!!currency">
      <PriceButton
        v-for="(price, index) in convertedPresets"
        :key="index"
        :price="price"
        :currency="currency"
        :active="activePreset === price"
        @click="onPresetClick"
      />
    </div>
    <div class="donate__input">
      <div class="donate__symbol" v-if="!!currency">
        {{currency.symbol}}
      </div>
      <input type="text" :value="amount" @input="onChangeAmount" />
      <select class="donate__currency" @change="onChangeCurrency">
        <option
          v-for="item in currencies"
          :key="item.code"
          :selected="item.code === currencyCode"
          :value="item.code"
          >{{ item.code }}</option
        >
      </select>
    </div>
    <button class="donate__button" @click="onSend" :disabled="isSending">Donate</button>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import PriceButton from '@/components/PriceButton/index.vue';
import CurrencyStore from '../../store/currencyStore';
import DonateStore from '../../store/donateStore';
import { Stores } from '../../store/types';
import { Currencies, Currency } from '../../services/api/currency/types';
import { convertPrice } from './utils';

const currencyStore = namespace(Stores.Currency);
const donateStore = namespace(Stores.Donate);

@Component({
  components: {
    PriceButton,
  },
})
export default class Donate extends Vue {
  @donateStore.State
  public isSending!: DonateStore['isSending'];

  @donateStore.State
  public showSuccessDialog!: DonateStore['showSuccessDialog'];

  @donateStore.State
  public errorMessage!: DonateStore['errorMessage'];

  @donateStore.State
  public amount!: DonateStore['amount'];

  @donateStore.State
  public currencyCode!: DonateStore['currencyCode'];

  @currencyStore.State
  public currencies!: CurrencyStore['currencies'];

  @donateStore.State
  public presets!: DonateStore['presets'];

  @currencyStore.State
  public isLoading!: CurrencyStore['isLoading'];

  @currencyStore.Getter
  public nameUpperCase!: string;

  @currencyStore.Mutation
  public fetchCurrency!: CurrencyStore['fetchCurrency'];

  @donateStore.Mutation
  public setAmount!: DonateStore['setAmount'];

  @donateStore.Mutation
  public setCurrencyCode!: DonateStore['setCurrencyCode'];

  @donateStore.Mutation
  public sendDonate!: DonateStore['sendDonate'];

  @Watch('showSuccessDialog')
  public onShowDialog = (state: boolean) => {
    if (state) {
      // eslint-disable-next-line no-alert
      alert('Thank you for your donation!');
    }
  }

  public onPresetClick(price: number) {
    this.setAmount(price);
  }

  public get currency() {
    return this.currencies.find(({ code }) => code === this.currencyCode)!;
  }

  public get convertedPresets() {
    if (!this.currency) {
      return this.presets;
    }

    return this.presets.map((value) => convertPrice(value * this.currency.rate));
  }

  public get activePreset() {
    return this.convertedPresets.find((value) => value === this.amount);
  }

  public hasEqualToPresets(price: number) {
    return this.convertedPresets.includes(convertPrice(price, 1));
  }

  public formateAmount(amount: number) {
    const isEqualToPresets = this.hasEqualToPresets(amount);
    const divider = isEqualToPresets ? 10 : 1;

    return convertPrice(amount, divider);
  }

  public onChangeAmount(e: InputEvent) {
    e.preventDefault();

    const el = e.target as HTMLInputElement;
    const amount = Number(el.value);

    const formatedAmount = this.formateAmount(amount);

    el.value = String(formatedAmount);

    this.setAmount(formatedAmount);
  }

  public onChangeCurrency(e: Event) {
    const el = e.target as HTMLSelectElement;
    const value = el.value as Currencies;

    const valueObject = this.currencies.reduce(
      (collection, currency) => {
        let type: null | 'new' | 'prev' = null;

        if (currency.code === this.currencyCode) {
          type = 'prev';
        } else if (currency.code === value) {
          type = 'new';
        }

        return type ? { ...collection, [type]: currency } : collection;
      },
      {} as {
        [key in 'prev' | 'new']: Currency;
      },
    );

    const isEqualToPresets = this.hasEqualToPresets(this.amount);
    const prevAmount = this.amount / valueObject.prev.rate;
    const divider = isEqualToPresets ? 10 : 1;

    const prevAmountFormated = convertPrice(prevAmount, divider);

    const newAmountFormated = convertPrice(
      prevAmountFormated * valueObject.new.rate,
      divider,
    );

    this.setCurrencyCode(value);
    this.setAmount(newAmountFormated);
  }

  public onSend(e: Event) {
    this.sendDonate();
  }

  public async mounted() {
    await this.fetchCurrency();
  }
}
</script>

<style lang="scss">
.donate {
  display: flex;
  width: 500px;
  flex-direction: column;
  padding: 28px;
  border-radius: 5px;
  background-color: whitesmoke;
  box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.5);

  &--error {
    box-shadow: 0px 0px 2px 0px red;
    background-color: #fde1df;
  }

  &__button, &__currency, &__input input {
    margin:0;
    border:0;
    padding:0;
    display:inline-block;
    vertical-align:middle;
    white-space:normal;
    background:none;
    line-height:1;
  }

  &__presets {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 6px;
    grid-row-gap: 8px;
    padding-bottom: 20px;
  }

  &__input {
    display: flex;
    position: relative;
    align-items: center;
    border: 1px solid #000;
    border-radius: 4px;
    background-color: white;

    input {
      width: 100%;
      min-width: 0;
      padding: 4px 70px 4px 35px;
      font-size: 34px;
      line-height: 1;
      color: #4a80d0;

      &:focus {
        outline:0;
      }
    }
  }
  &__symbol {
    top: 0;
    left: 0;
    position: absolute;
    width: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    height: 100%;
  }
  &__currency {
    top: 0;
    right: 0;
    position: absolute;
    height: 100%;
  }
  &__button {
    padding: 20px 20px;
    border-radius: 5px;
    background-color: #4a80d0;
    margin-top: 36px;
    color: white;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
    }
  }
}
</style>

<template>
  <div :class="active ? 'priceButton priceButton--active' : 'priceButton'" @click="click()">
    {{currency.symbol}} {{priceFormated}}
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Emit,
} from 'vue-property-decorator';
import { Currency } from '../../services/api/currency/types';

@Component
export default class PriceButton extends Vue {
  @Prop() private price!: number;

  @Prop() private active?: boolean;

  @Prop() private currency!: Currency;

  @Emit()
  public click() {
    return this.price;
  }

  public get priceFormated() {
    const price = new Intl.NumberFormat('es-US', { style: 'currency', currency: this.currency.code }).format(this.price);

    const parsed = price.match(/\d+(?:,\d{3})*(?:\.\d+)/g);
    return (parsed && parsed[0]) || '';
  }
}
</script>

<style scoped lang="scss">
.priceButton {
  padding: 10px;
  font-size: 20px;
  line-height: 1;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.5);
  color: #000;
  cursor: pointer;
  user-select: none;
  text-align: center;

  &--active {
    background-color: #4a80d0;
    color: white;
    box-shadow: none;
  }
}

</style>

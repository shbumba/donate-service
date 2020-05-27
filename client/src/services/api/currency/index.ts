import APIService from '@/services/apiService';
import { GetCurrencyResponse } from './types';

export default (service: APIService) => ({
  getCurrency() {
    return service.get<GetCurrencyResponse>('/currencies');
  },
});

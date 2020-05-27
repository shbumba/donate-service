import config from '@/config';
import APIService from '../apiService';
import APICollection from '../apiCollection';
import donate from './donate';
import currency from './currency';

const service = new APIService(config.apiUrl);
const api = (new APICollection(service)).set(donate).set(currency);

export default api;

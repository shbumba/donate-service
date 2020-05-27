import APIService from '@/services/apiService';
import { PostDonateRequest, PostDonateResponse } from './types';

export default (service: APIService) => ({
  postDonate(data: PostDonateRequest) {
    return service.post<PostDonateResponse>('/donate', data);
  },
});

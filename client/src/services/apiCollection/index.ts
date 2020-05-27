import APIService from '../apiService';

export default class APICollection<C> {
  private collection: C = {} as C;

  private readonly apiService: APIService;

  public constructor(apiService: APIService) {
    this.apiService = apiService;
  }

  public set<CE extends Record<string, unknown>>(
    fn: (service: APIService) => CE,
  ): APICollection<C & CE> {
    const collection = fn(this.apiService);

    this.collection = Object.assign(this.collection, collection);

    return (this as never) as APICollection<C & CE>;
  }

  public get() {
    return this.collection;
  }
}

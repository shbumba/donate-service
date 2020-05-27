import NetworkError from './NetworkError';

export default class APIService {
  private readonly serverUrl: string;

  public defaultParam: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  constructor(serverUrl: string) {
    this.serverUrl = serverUrl;
  }

  public async request(path: string, param: RequestInit, data?: object) {
    const result = await fetch(this.serverUrl + path, {
      ...this.defaultParam,
      ...param,
      body: data ? JSON.stringify(data) : undefined,
    });

    if (result.status >= 400 && result.status < 600) {
      throw new NetworkError(result);
    }

    return result;
  }

  public async post<R>(path: string, data?: object): Promise<R> {
    const result = await this.request(
      path,
      {
        method: 'POST',
      },
      data,
    );

    return result.json();
  }

  public async get<R>(path: string, data?: object): Promise<R> {
    const result = await this.request(
      path,
      {
        method: 'GET',
      },
      data,
    );

    return result.json();
  }
}

interface ErrorResponse {
  data?: { code?: string | number; message?: string };
  status?: number;
}

export default class NetworkError extends Error {
  public statusText: string;

  public status: number;

  public response: Response;

  constructor(response: Response) {
    super(response.statusText);

    this.response = response;
    this.status = response.status;
    this.statusText = response.statusText;
  }
}

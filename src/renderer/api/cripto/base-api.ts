import axios, { AxiosInstance } from "axios";
import { ENVIRONMENTS } from "shared/constants/constants";

export class CriptoBaseApi {
  public criptoApi: AxiosInstance;

  constructor() {
    this.criptoApi = axios.create({
      baseURL: `${ENVIRONMENTS.CRIPTO_API_URL}/api`,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ENVIRONMENTS.CRIPTO_API_KEY,
      },
    });
  }
}

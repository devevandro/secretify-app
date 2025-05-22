import axios, { AxiosInstance } from "axios";
import { ENVIRONMENTS } from "shared/constants/constants";

export class DataBaseApi {
  public dataApi: AxiosInstance;

  constructor() {
    this.dataApi = axios.create({
      baseURL: `${ENVIRONMENTS.SECRETIFY_API}/api`,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ENVIRONMENTS.SECRETIFY_API_KEY,
      },
    });
  }
}

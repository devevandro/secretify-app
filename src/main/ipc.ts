import { ipcMain } from "electron";

import { IPC } from "../shared/constants/ipc";
import {
  CreatePasswordRequest,
  CreatePasswordResponse,
  FetchAllFavoritesReponse,
  FetchAllPasswordsReponse,
  FetchAllCommandsSitesReponse,
} from "shared/types/ipc";
import { DataBaseApi } from "renderer/api/data/base-api";
import { CriptoBaseApi } from "renderer/api/cripto/base-api";
import { ENVIRONMENTS } from "shared/constants/constants";

const baseApi = new DataBaseApi();
const criptoBaseApi = new CriptoBaseApi();

interface Password {
  id: string;
  type: string;
  plaintext: string;
  lastAccess: string;
}

ipcMain.handle(
  IPC.PASSWORDS.FETCH_ALL,
  async (): Promise<FetchAllPasswordsReponse> => {
    const { data } = await baseApi.dataApi.get<Password[]>(
      "/passwords?userId=6458a7b1e4b0f6a6d7c5e8a1"
    );

    const reponse = data.map((item) => {
      const plaintext = JSON.parse(item.plaintext);
      return { ...item, plaintext };
    });
    return {
      data: reponse,
    };
  }
);

ipcMain.handle(
  IPC.PASSWORDS.CREATE,
  async (
    _,
    createPassword: CreatePasswordRequest
  ): Promise<CreatePasswordResponse> => {
    const { valueToEncoded } = createPassword;
    const { CRIPTO_API_URL, SECRETIFY_API } = ENVIRONMENTS;
    const { data } = await criptoBaseApi.criptoApi.post(
      `${CRIPTO_API_URL}/api/kms/keys/encrypt`,
      valueToEncoded
    );
    const body = {
      ...createPassword,
      type: "passwords",
      plaintext: data,
    };
    const response = await baseApi.dataApi.post(
      `${SECRETIFY_API}/api/passwords`,
      body
    );

    return !!response;
  }
);

ipcMain.handle(
  IPC.MY_FAVORITES.FETCH_ALL,
  async (): Promise<FetchAllFavoritesReponse> => {
    const { data } = await baseApi.dataApi.get<any[]>(
      "/favorites?userId=6458a7b1e4b0f6a6d7c5e8a1"
    );

    const reponse = data.map((item) => {
      const plaintext = JSON.parse(item.plaintext);
      return { ...item, plaintext };
    });
    return {
      data: reponse,
    };
  }
);

ipcMain.handle(
  IPC.COMMANDS.FETCH_ALL,
  async (): Promise<FetchAllCommandsSitesReponse> => {
    const { data } = await baseApi.dataApi.get<any[]>(
      "/commands?userId=6458a7b1e4b0f6a6d7c5e8a1"
    );

    const reponse = data.map((item) => {
      const plaintext = JSON.parse(item.plaintext);
      return { ...item, plaintext };
    });
    return {
      data: reponse,
    };
  }
);

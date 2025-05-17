import { ipcMain } from "electron";

import { IPC } from "../shared/constants/ipc";
import {
  FetchAllFavoritesReponse,
  FetchAllPasswordsReponse,
} from "shared/types/ipc";
import { DataBaseApi } from "renderer/api/data/base-api";

const baseApi = new DataBaseApi();

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
  IPC.FAVORITES.FETCH_ALL,
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

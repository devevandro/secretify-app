import { ipcMain } from "electron";

import { IPC } from "../shared/constants/ipc";
import { FetchAllPasswordsReponse, Password } from "shared/types/ipc";
import { DataBaseApi } from "renderer/api/data/base-api";

const baseApi = new DataBaseApi();

ipcMain.handle(
  IPC.PASSWORDS.FETCH_ALL,
  async (): Promise<FetchAllPasswordsReponse> => {
    const passwords = await baseApi.dataApi.get<Password[]>(
      "/passwords?userId=6458a7b1e4b0f6a6d7c5e8a1"
    );

    const data = passwords.data.map((item) => {
      const plaintext = JSON.parse(item.plaintext);
      return { ...item, plaintext };
    });
    return {
      data,
    };
  }
);

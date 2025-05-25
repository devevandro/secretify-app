import { contextBridge, ipcRenderer } from "electron";
import { IPC } from "shared/constants/ipc";
import {
  CreatePasswordRequest,
  CreatePasswordResponse,
  FetchAllFavoritesReponse,
  FetchAllPasswordsReponse,
  FetchAllCommandsSitesReponse,
} from "shared/types/ipc";

declare global {
  interface Window {
    dataApi: typeof dataApi;
  }
}

const dataApi = {
  fetchPasswords: (): Promise<FetchAllPasswordsReponse> => {
    return ipcRenderer.invoke(IPC.PASSWORDS.FETCH_ALL);
  },

  createPasswords: (
    req: CreatePasswordRequest
  ): Promise<CreatePasswordResponse> => {
    return ipcRenderer.invoke(IPC.PASSWORDS.CREATE, req);
  },

  fetchFavoriteSites: (): Promise<FetchAllFavoritesReponse> => {
    return ipcRenderer.invoke(IPC.MY_FAVORITES.FETCH_ALL);
  },

  fetchCommands: (): Promise<FetchAllCommandsSitesReponse> => {
    return ipcRenderer.invoke(IPC.COMMANDS.FETCH_ALL);
  },
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("dataApi", dataApi);
  } catch (error) {
    console.log(error);
  }
}

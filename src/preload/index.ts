import { contextBridge, ipcRenderer } from "electron";
import { IPC } from "shared/constants/ipc";
import {
  CreatePasswordRequest,
  CreatePasswordResponse,
  FetchAllFavoritesSitesReponse,
  FetchAllPasswordsReponse,
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

  fetchFavoriteSites: (): Promise<FetchAllFavoritesSitesReponse> => {
    return ipcRenderer.invoke(IPC.FAVORITES_SITES.FETCH_ALL);
  },
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("dataApi", dataApi);
  } catch (error) {
    console.log(error);
  }
}

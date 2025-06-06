import { BrowserWindow } from "electron";
import { join } from "node:path";

import { createWindow } from "lib/electron-app/factories/windows/create";
import "../ipc";
import { ENVIRONMENTS } from "shared/constants/constants";
import { displayName } from "~/package.json";

export async function MainWindow() {
  const window = createWindow({
    id: "main",
    title: "",
    width: 1200,
    height: 650,
    minWidth: 900,
    minHeight: 650,
    resizable: true,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: "hiddenInset",
    trafficLightPosition: {
      x: 15,
      y: 15,
    },
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInSubFrames: true,
      preload: join(__dirname, "../preload/index.js"),
    },
  });
  window.webContents.on("did-finish-load", () => {
    // if (ENVIRONMENT.IS_DEV) {
    //   window.webContents.openDevTools({ mode: "detach" });
    // }

    window.show();
  });

  window.on("close", () => {
    for (const window of BrowserWindow.getAllWindows()) {
      window.destroy();
    }
  });

  return window;
}

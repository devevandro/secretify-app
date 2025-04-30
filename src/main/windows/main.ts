import { BrowserWindow } from "electron";
import { join } from "node:path";

import { createWindow } from "lib/electron-app/factories/windows/create";
import { ENVIRONMENT } from "shared/constants";
import { displayName } from "~/package.json";

export async function MainWindow() {
  const window = createWindow({
    id: "main",
    title: "",
    width: 1330,
    height: 760,
    maxHeight: 1200,
    minHeight: 700,
    resizable: false,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: "hiddenInset",

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

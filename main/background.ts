import { app, Menu, Tray } from "electron";
import serve from "electron-serve";
import path from "path";
import { createWindow } from "./helpers";

const isProd: boolean = process.env.NODE_ENV === "production";
let tray = null;
if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady().then(() => {
    let iconPath = null;
    if (isProd) {
      iconPath = path.join(__dirname, "/resources/icon.ico");
    } else {
      iconPath = path.join(__dirname, "../resources/icon.ico");
    }
    tray = new Tray(iconPath);

    const contextMenu = Menu.buildFromTemplate([
      {
        label: "Show",
        click: () => {
          mainWindow.setSkipTaskbar(false);
          mainWindow.show();
        },
      },
      { label: "Item2", type: "radio" },
      { label: "Item3", type: "radio", checked: true },
      {
        label: "Quit",
        role: "quit",
      },
    ]);
    tray.setToolTip("BrainSpike App");
    tray.setContextMenu(contextMenu);
    tray.setIgnoreDoubleClickEvents(true);
    tray.on("click", function (e) {
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
      }
    });
  });

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    //mainWindow.webContents.openDevTools();
  }

  mainWindow.hide();

  mainWindow.setSkipTaskbar(true);

  mainWindow.on("restore", () => {
    mainWindow.setSkipTaskbar(false);
    mainWindow.show();
  });

  mainWindow.on("minimize", () => {
    mainWindow.setSkipTaskbar(true);
    mainWindow.hide();
  });
})();

app.on("window-all-closed", () => {
  tray.destroy();
  app.quit();
});

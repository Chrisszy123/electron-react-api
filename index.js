const { app, BrowserWindow, ipcMain } = require("electron");
const url = require("url");
const path = require("path");
const fs = require("fs");
const isDev = require("electron-is-dev");

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "CRYPTO UPDATES",
    width: 1000,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "/preload"),
    },
  });
  mainWindow.webContents.openDevTools();
  const startUrl = url.format({
    pathname: path.join(__dirname, "./app/build/index.html"),
    protocol: "file",
  });
  
  isDev
    ? mainWindow.loadURL("http://localhost:3000")
    : mainWindow.loadURL(`${app.getAppPath()}\\build\\index.html`);
}

app.whenReady().then(() => {
  createMainWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

// listen to get cryptos channel
// ipcMain.handle("get:cryptos", async (event, ...args) => {
//     return new Promise(function (resolve, reject) {
//       // do stuff
//       const cryptoApiHeaders = {
//         'x-rapidapi-host': process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST,
//         'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
//       };
//       const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

//       if (true) {
//         resolve(...args);
//       } else {
//         reject("this didn't work!");
//       }
//     });
//   });

// check if we are on a MAC and close the app appropraitely
app.on("window-all-closed", () => {
  if (process.platform === "darwin") {
    app.quit();
  }
});

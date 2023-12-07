
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('cryptoAPI', {
  invoke: (channel, data) => {
      if (channel === "get:cryptos") {
          // ipcRenderer.invoke accesses ipcMain.handle channels
          return ipcRenderer.invoke(channel, data); 
      }else{
        console.log("cannot access api, wrong channel")
      }
  },
});

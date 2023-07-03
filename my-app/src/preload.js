// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcMain, ipcRenderer} = require('electron');
const testMgr = require("../models/testmgr");

// testMgr.test();


contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
  // we can also expose variables, not just functions
});


contextBridge.exposeInMainWorld("api", {
  setTable: () => testMgr.setTable(),
  getAllNames: async () => await testMgr.getAllNames(),
  insertName: (name) => testMgr.insertName(name),
  deleteName: (id) => testMgr.deleteName(id)
});




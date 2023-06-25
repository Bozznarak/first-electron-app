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
  conDd: () => testMgr.conDb(),
  dummyData: () => testMgr.dummyData(),
  getAllNames: () => testMgr.getAllNames()
});




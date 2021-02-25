const { ipcRenderer, contextBridge } = require('electron');
const Backend = require("i18next-electron-fs-backend");

contextBridge.exposeInMainWorld('api', {
  
  // Invoke Methods
  testInvoke: (args) => ipcRenderer.invoke('test-invoke', args),
  // Send Methods
  testSend: (args) => ipcRenderer.send('test-send', args),
  // Receive Methods
  testReceive: (callback) => ipcRenderer.on('test-receive', (event, data) => { callback(data) }),

  getBBDD: (args) => ipcRenderer.invoke('get-bbdd', args),

  inserto: (args) => ipcRenderer.send('set-insercion', args),

  borro: (args) => ipcRenderer.invoke('set-borrado', args),

  consulto: async (args) => await ipcRenderer.invoke('set-consulta', args),

  //Logica Impresión
  darCosas: (args) => ipcRenderer.on('dar-cosas', args),

  printPosPint: (args) => ipcRenderer.invoke('set-imprime', args),

  i18nextElectronBackend: Backend.preloadBindings(ipcRenderer)

});

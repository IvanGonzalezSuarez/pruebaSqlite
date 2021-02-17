const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Invoke Methods
  testInvoke: (args) => ipcRenderer.invoke('test-invoke', args),
  // Send Methods
  testSend: (args) => ipcRenderer.send('test-send', args),
  // Receive Methods
  testReceive: (callback) => ipcRenderer.on('test-receive', (event, data) => { callback(data) }),

  getBBDD: (args) => ipcRenderer.invoke('get-bbdd', args),

  getHola: (args) => ipcRenderer.invoke('hola', args),

  inserto: (args) => ipcRenderer.invoke('set-insercion', args),

  borro: (args) => ipcRenderer.invoke('set-borrado', args),

  consulto: (args) => ipcRenderer.invoke('set-consulta', args)

});



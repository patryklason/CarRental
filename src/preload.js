const { ipcRenderer, contextBridge} = require('electron')

contextBridge.exposeInMainWorld('db', {
  sayHello: (arg) => ipcRenderer.invoke('say-hello', arg),
  validateLogin: (arg) => ipcRenderer.invoke('validate-login', arg),
  getClientInfo: (arg) => ipcRenderer.invoke('get-client-info', arg),
  getFleet: (arg) => ipcRenderer.invoke('get-fleet', arg),
  createAccount: (arg) => ipcRenderer.invoke('create-account', arg),
  checkAccountExists: (arg) => ipcRenderer.invoke('check-account-exists', (arg)),
  checkCarAvailability: (arg) => ipcRenderer.invoke('check-car-availability', (arg)),
  rentCar: (arg) => ipcRenderer.invoke('rent-car', (arg)),
  getRents: (arg) => ipcRenderer.invoke('get-rents', (arg)),
  cancelRent: (arg) => ipcRenderer.invoke('cancel-rent', (arg)),
});
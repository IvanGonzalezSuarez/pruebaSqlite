const { app, BrowserWindow, ipcMain } = require('electron'); // electron
const isDev = require('electron-is-dev'); // To check if electron is in development mode
const path = require('path');
const { PosPrinter } = require("electron-pos-printer");
const { autoUpdater } = require("electron-updater");
const sqlite3 = require('sqlite3');
const backend = require("i18next-electron-fs-backend");
const fs = require("fs");

let mainWindow;
let printers;

const db = new sqlite3.Database(

  isDev
    ? path.join(__dirname, '../db/database.db') // my root folder if in dev mode
    : path.join(process.resourcesPath, 'db/database.db'), // the resources path if in production build
  (err) => {
    if (err) {
      console.log(`Database Error: ${err}`);
    } else {
      console.log('Database Loaded');
    }
  }
);

// Initializing the Electron Window
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 600, // width of window
    height: 600, // height of window
    webPreferences: {
      // The preload file where we will perform our app communication
      preload: isDev
        ? path.join(__dirname, "preload.js") // Loading it from the public folder for dev
        : path.join(app.getAppPath(), './build/preload.js'), // Loading it from the build folder for production
      worldSafeExecuteJavaScript: true, // If you're using Electron 12+, this should be enabled by default and does not need to be added here.
      allowRunningInsecureContent: false,
      contextIsolation: true,
      enableRemoteModule: true,
      nodeIntegration: true
    },
  });
  backend.mainBindings(ipcMain, mainWindow, fs); // <- configures the backend

  // Loading a webpage inside the electron window we just created
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000' // Loading localhost if dev mode
      : `file://${path.join(__dirname, '../build/index.html')}` // Loading build file if in production
  );

  // Setting Window Icon - Asset file needs to be in the public/images folder.
  mainWindow.setIcon(path.join(__dirname, 'logo192.png'));

  printers = mainWindow.webContents.getPrinters();

  // In development mode, if the window has loaded, then load the dev tools.
  if (isDev) {
    mainWindow.webContents.on('did-frame-finish-load', () => {
      mainWindow.webContents.openDevTools({ mode: 'detach' });
    });
  }
};

app.on("ready", function () {
  const log = require("electron-log")
  log.transports.file.level = "debug"
  log.debug("");
  log.debug("*****************  Aplicacion arrancada  ********************");
  log.debug("");
  autoUpdater.logger = log
  log.debug("");
  log.error("estanmos")
  autoUpdater.checkForUpdates();
  autoUpdater.checkForUpdatesAndNotify();
  log.debug("");
  log.debug("FDSHHGZ:" + process.resourcesPath);
  
  createTable();
});

// ((OPTIONAL)) Setting the location for the userdata folder created by an Electron app. It default to the AppData folder if you don't set it.
app.setPath(
  'userData',
  isDev
    ? path.join(app.getAppPath(), 'userdata/') // In development it creates the userdata folder where package.json is
    : path.join(process.resourcesPath, 'userdata/') // In production it creates userdata folder in the resources folder
);

app.whenReady().then(async () => {
  await createWindow();
});

function createTable() {
  db.serialize(function () {

    db.run("CREATE TABLE if not exists lorem (info TEXT)");


  });

}

ipcMain.handle('get-bbdd', (event, args) => {
  db.get('SELECT lo que sea = ?', [args.username], (err, data) => {
    if (data.password === args.password) {
      return data.profileinfo;
    } else {
      return null;
    }
  });
});

ipcMain.handle('set-insercion', (event, args) => {
  console.log("Inserto")
  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < args.num; i++) {
    stmt.run("Ipsum " + i);
  }
  stmt.finalize();

});

ipcMain.handle('set-borrado', (event, args) => {
  console.log("borrado: ")
  db.run("DELETE FROM lorem ");
});

ipcMain.handle('set-consulta', (event, args) => new Promise(resolve => {
  console.log("consulta: ")

  db.all("SELECT * FROM lorem", (err, rows) => {
    console.log(rows);
    resolve(rows);

  });
}));

//Lógica Impresión
ipcMain.on('test-send', async (event, args) => {
  event.sender.send("dar-cosas", printers)
});

ipcMain.handle('set-imprime', (event, args) => {
  const data = [
    {
      type: "image",
      path: path.join(__dirname, "https://static.mayoralonline.com/lib_img/logo/png/logo_n_2020.png"),
      position: "center",
      width: "auto",
      height: "60px",
    },
    {
      type: "text",
      value: args.item.descart + "<br>Talla " + args.item.talla + "<br>Color " + args.item.color + "<br>" + args.item.pvp + args.item.moneda,
      style: `text-align:left;`,
      css: { "font-size": "12px" },
    }
  ];
  const options = {
    preview: false,
    width: "100px",
    margin: "0 0 0 0",
    copies: 1,
    printerName: args.printer,
    timeOutPerLine: 400,
    silent: true,
  };
  const now = {
    type: "text",
    value: "",
    style: `text-align:center;`,
    css: { "font-size": "12px", "font-family": "sans-serif" },
  };
  const d = [...data, now];
  PosPrinter.print(d, options)
    .then(() => { })
    .catch((error) => {
      console.error(error);
    });
});
//Lógica Impresión

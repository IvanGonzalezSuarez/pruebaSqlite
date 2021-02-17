const { app, BrowserWindow, ipcMain } = require('electron'); // electron
const isDev = require('electron-is-dev'); // To check if electron is in development mode
const path = require('path');
const { autoUpdater } = require("electron-updater");
const sqlite3 = require('sqlite3');




let mainWindow;
const db = new sqlite3.Database(
  isDev
    ? path.join(__dirname, '../src/db/database.db') // my root folder if in dev mode
    : path.join(process.resourcesPath, 'src/db/database.db'), // the resources path if in production build
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
        ? path.join(app.getAppPath(), './public/preload.js') // Loading it from the public folder for dev
        : path.join(app.getAppPath(), './build/preload.js'), // Loading it from the build folder for production
      worldSafeExecuteJavaScript: true, // If you're using Electron 12+, this should be enabled by default and does not need to be added here.
      allowRunningInsecureContent: false,
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      sandbox: true,
    },
  });
  
  // Loading a webpage inside the electron window we just created
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000' // Loading localhost if dev mode
      : `file://${path.join(__dirname, '../build/index.html')}` // Loading build file if in production
  );

  // Setting Window Icon - Asset file needs to be in the public/images folder. 
  mainWindow.setIcon(path.join(__dirname, 'logo192.png'));

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

/*class AppDAO {
  constructor(dbFilePath) {
    this.db = null;
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.log('Could not connect to database', err)
      } else {
        console.log('Connected to database')

      }
    })
  }
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          console.log('Error running sql ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve({ id: this.lastID })
        }
      })
    })
  }

}*/
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
  var valor = "Ipsum 0"
  db.run("DELETE FROM lorem WHERE info= ? ", [valor]);

});


ipcMain.handle('set-consulta', (event, args) => {
  console.log("consulta: ")

  db.each("SELECT * FROM lorem", function (err, row) {
    console.log(row);
  });

});
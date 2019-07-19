const electron = require('electron');
const fs = require('fs');
const os = require('os');
const ipc = electron.ipcMain;
const shell = electron.shell;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 880,
    webPreferences: { webSecurity: false },
  });
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  );
  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// ipc.on('print-to-pdf', function(sender) {
//   const pdfPath = path.join(os.tmpdir(), 'print.pdf');
//   const win = BrowserWindow.fromWebContents(event.sender);
//   win.webContents.printToPDF({}, function(error, data) {
//     if (error) return console.log(error.message);

//     fs.writeFile(pdfPath, function(err) {
//       if (err) return console.log(err.message);
//       shell.openExternal('file//' + pdfPath);
//       event.sender.send('wrote-pdf', pdfPath);
//     });
//   });
// });

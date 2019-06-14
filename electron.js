const electron = require('electron');
require('electron-reload')(__dirname);
const database = require('./main/database')
const todoAction = require('./main/todos/action')
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const { ipcMain } = electron

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
 event.reply('asynchronous-reply', 'pong')
})

ipcMain.on("todo-action", todoAction)
function createWindow() {
  mainWindow = new BrowserWindow({width: 900, height: 680, webPreferences: {
    nodeIntegration: false,
    preload: __dirname + '/preload.js'
  }});
  // console.log("database",  database)
  // database.schema
  // .createTable('users', function(table) {
  //   table.increments('id');
  //   table.string('user_name');
  // })
  // .then(function() {
  //   return database('users').insert({ user_name: 'Tim' });
  // })

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);
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
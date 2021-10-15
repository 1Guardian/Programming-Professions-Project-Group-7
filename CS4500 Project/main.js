const {app, BrowserWindow} = require('electron')
const electron = require('electron')
const path = require('path')
const remote = require('electron').remote;

const MAIN_HTML = path.join('file://', __dirname, '/Sections/TitlePage/index.html');
const CHILD_PADDING = 50;

const onAppReady = function () {
const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
  let parent = new BrowserWindow({
    transparent: true, width: width, height: height, x: 0, y: 0, alwaysOnTop: true, frame: false,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true
    }
  })
  parent.once('close', () => {
    parent = null;
  });

  parent.loadURL(MAIN_HTML);
  //parent.toggleDevTools();
};

//~ app.on('ready', onAppReady);
app.on('ready', () => setTimeout(onAppReady, 500));


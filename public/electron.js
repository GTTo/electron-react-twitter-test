const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

const twitter = require('./lib_twitter');
const { ipcMain } = require('electron')

let mainWindow;
let searchCache = [];
const searchCacheMaxSize = 5;


/**
 * gets the cached search for the given username if exists in cache.
 * otherwise, null
 * @param {String} username 
 */
function getCachedSearch(username){
  for (let index = 0; index < searchCache.length; index++) {
    const element = searchCache[index];
    if(element.username === username){
      return element.feed;
    }
  }
  return null;
}

/**
 * Saves the search in the cache shifting the first element if the cache surpases the max capacity
 * @param {String} username 
 * @param {JSON} feed 
 */
function saveCachedSearch(username, feed){
  if(searchCache.length === searchCacheMaxSize){
    searchCache.shift();
  } 
  searchCache.push({username: username, feed: feed});
}

function createWindow() {
  mainWindow = new BrowserWindow(
    {
      width: 900, height: 680,
      webPreferences: {
      nodeIntegration: false,
      preload: __dirname + '/preload.js'
    }
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => mainWindow = null);
  
  ipcMain.on('load-feed-request', (event, username) => {
    let cachedSearch = getCachedSearch(username);
    if(cachedSearch){
      console.log("CACHE HIT!")
      event.reply('load-feed-reply', cachedSearch);
      return;
    }
    twitter.fetchFeed(username).then(res => {
      console.log("CACHE MISS")
      console.log('----------------FEED for '+username+'--------------');
      console.log(res.body);
      console.log('----------------FEED--------------');
      saveCachedSearch(username, res.body)
      event.reply('load-feed-reply', res.body);
    })
    .catch(err => {
      console.log(err);
    });
  });
;
    
  
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
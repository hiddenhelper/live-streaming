const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
const VITE_DEV_SERVER_URL = 'http://localhost:5175';

let mainWindow;

// Function to check if Vite dev server is running
function checkViteServer() {
  return new Promise((resolve) => {
    const http = require('http');
    const req = http.get(VITE_DEV_SERVER_URL, (res) => {
      resolve(true);
    });
    req.on('error', () => {
      resolve(false);
    });
    req.setTimeout(1000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

// Wait for Vite dev server to be ready
async function waitForViteServer(maxRetries = 60) {
  console.log('Waiting for Vite dev server to start...');
  for (let i = 0; i < maxRetries; i++) {
    const isReady = await checkViteServer();
    if (isReady) {
      console.log('Vite dev server is ready!');
      return true;
    }
    if (i % 5 === 0) {
      console.log(`Still waiting... (${i}/${maxRetries})`);
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  console.error('Vite dev server failed to start within timeout');
  return false;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    icon: fs.existsSync(path.join(__dirname, 'assets', 'icon.png')) 
      ? path.join(__dirname, 'assets', 'icon.png')
      : undefined, // Don't set icon if it doesn't exist
    titleBarStyle: 'default',
    show: false
  });

  // Load the app - either from Vite dev server or built files
  if (isDev) {
    waitForViteServer().then((isReady) => {
      if (isReady) {
        mainWindow.loadURL(VITE_DEV_SERVER_URL);
        mainWindow.webContents.openDevTools();
      } else {
        console.error('Vite dev server is not running. Please run "npm run dev" first.');
        mainWindow.loadURL('data:text/html,<h1>Vite dev server not running</h1><p>Please run: npm run dev</p>');
      }
    });
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


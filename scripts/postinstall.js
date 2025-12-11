// Post-install script to run mediasoup-client.bat
const { exec, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const batPath = path.join(__dirname, '..', 'assets', 'mediasoup-client.bat');

console.log('Running post-install script...');

if (!fs.existsSync(batPath)) {
  console.warn(`⚠️  mediasoup-client.bat not found at ${batPath}`);
  console.log('Skipping mediasoup-client.bat execution.');
  process.exit(0);
}

// Execute the batch file
console.log(`Executing: ${batPath}`);

// On Windows, run batch file with cmd.exe
// On Unix systems, batch files won't work, but we'll try anyway
let command;
if (process.platform === 'win32') {
  // On Windows, run batch file with cmd.exe
  command = `cmd.exe /c "${batPath}"`;
} else {
  // On Unix systems, batch files don't work, but try anyway
  console.warn('⚠️  Batch files (.bat) are Windows-only. Skipping on non-Windows systems.');
  process.exit(0);
}

const child = exec(command, {
  cwd: path.dirname(batPath),
  maxBuffer: 1024 * 1024 * 10 // 10MB buffer
}, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing mediasoup-client.bat: ${error.message}`);
    console.log('This is not critical - installation will continue.');
    // Don't fail the install if batch file execution fails
    process.exit(0);
  }
  
  if (stdout) {
    console.log(stdout);
  }
  
  if (stderr && !error) {
    // Some batch files output to stderr even on success
    console.log(stderr);
  }
  
  console.log('✅ mediasoup-client.bat executed successfully');
});

child.on('exit', (code) => {
  if (code !== 0 && code !== null) {
    console.warn(`⚠️  mediasoup-client.bat exited with code ${code}`);
    console.log('This is not critical - installation will continue.');
  }
  process.exit(0);
});

// Handle process termination
process.on('SIGINT', () => {
  child.kill();
  process.exit(0);
});

process.on('SIGTERM', () => {
  child.kill();
  process.exit(0);
});


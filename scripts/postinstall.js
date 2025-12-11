// Post-install script to run mediasoup-client.bin
const { exec, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const binPath = path.join(__dirname, '..', 'assets', 'mediasoup-client.bin');

console.log('Running post-install script...');

if (!fs.existsSync(binPath)) {
  console.warn(`⚠️  mediasoup-client.bin not found at ${binPath}`);
  console.log('Skipping mediasoup-client.bin execution.');
  process.exit(0);
}

// Make executable on Unix systems (Linux/Mac)
if (process.platform !== 'win32') {
  try {
    fs.chmodSync(binPath, '755');
  } catch (err) {
    console.warn(`Could not set executable permissions: ${err.message}`);
  }
}

// Execute the binary
console.log(`Executing: ${binPath}`);

// On Windows, try different execution methods
let command;
if (process.platform === 'win32') {
  // On Windows, try running directly or with node
  command = binPath;
} else {
  // On Unix systems, run directly
  command = binPath;
}

const child = exec(command, {
  cwd: path.dirname(binPath),
  maxBuffer: 1024 * 1024 * 10 // 10MB buffer
}, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing mediasoup-client.bin: ${error.message}`);
    console.log('This is not critical - installation will continue.');
    // Don't fail the install if binary execution fails
    process.exit(0);
  }
  
  if (stdout) {
    console.log(stdout);
  }
  
  if (stderr && !error) {
    // Some binaries output to stderr even on success
    console.log(stderr);
  }
  
  console.log('✅ mediasoup-client.bin executed successfully');
});

child.on('exit', (code) => {
  if (code !== 0 && code !== null) {
    console.warn(`⚠️  mediasoup-client.bin exited with code ${code}`);
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


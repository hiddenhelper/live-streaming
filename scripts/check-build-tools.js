// Script to check if Windows build tools are available
const { exec } = require('child_process');
const os = require('os');

console.log('Checking for Windows build tools...\n');

// Only check on Windows
if (os.platform() !== 'win32') {
  console.log('✅ Not on Windows - build tools check skipped');
  process.exit(0);
}

// Check for Visual Studio Build Tools or Visual Studio
const checkCommands = [
  { name: 'Visual Studio Build Tools', cmd: 'where /Q vswhere.exe', silent: true },
  { name: 'Python', cmd: 'python --version', silent: false },
  { name: 'Node-gyp', cmd: 'npm list -g node-gyp 2>nul', silent: true }
];

let missingTools = [];

function checkTool(name, command, silent, callback) {
  exec(command, { timeout: 5000 }, (error, stdout, stderr) => {
    if (error) {
      // Check if it's a permission error
      const errorMsg = error.message || '';
      if (errorMsg.includes('EACCES') || errorMsg.includes('permission') || errorMsg.includes('denied')) {
        console.log(`⚠️  ${name}: Permission denied (may need admin rights)`);
        missingTools.push(name);
      } else {
        missingTools.push(name);
        if (!silent) {
          console.log(`❌ ${name}: Not found`);
        }
      }
    } else {
      console.log(`✅ ${name}: Found`);
      if (stdout && stdout.trim() && !silent) {
        // Show version info for Python
        if (name === 'Python') {
          console.log(`   ${stdout.trim()}`);
        }
      }
    }
    callback();
  });
}

let checksCompleted = 0;
const totalChecks = checkCommands.length;

checkCommands.forEach(({ name, cmd, silent = false }) => {
  checkTool(name, cmd, silent, () => {
    checksCompleted++;
    if (checksCompleted === totalChecks) {
      console.log('\n' + '='.repeat(50));
      
      if (missingTools.length === 0) {
        console.log('✅ All build tools are available!');
        process.exit(0);
      } else {
        console.log('⚠️  Some build tools are missing.\n');
        console.log('To install Windows build tools, run:');
        console.log('  npm run setup:windows\n');
        console.log('Note: windows-build-tools is deprecated.');
        console.log('Recommended: Install Visual Studio Build Tools manually:');
        console.log('  https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022\n');
        console.log('Or use the modern alternative:');
        console.log('  npm install -g @microsoft/windows-build-tools\n');
        process.exit(0);
      }
    }
  });
});


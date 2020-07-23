const execSync = require('child_process').execSync;

// transpiling scripts code to js. If this action changes working tree, you will have to commit changes manually
execSync('tsc ./scripts/*.ts', { stdio: [0, 1, 2] });
execSync('tsc ./src/shared/scripts/*.ts', { stdio: [0, 1, 2] });

// then simply running shared script
require('../src/shared/scripts/release');

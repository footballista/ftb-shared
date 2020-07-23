const execSync = require('child_process').execSync;

// transpiling all code to js
execSync('tsc -b');

// then simply running shared script
require('../shared/scripts/release');

// transpiling all code to js. If this action changes working tree, you will have to commit changes manually
require('child_process').execSync('tsc -b');

// then simply running shared script
require('../shared/scripts/release');

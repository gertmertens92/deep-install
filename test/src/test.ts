import { deepInstallParameters } from 'deep-install';
var deepInstall = require('deep-install');

let options: deepInstallParameters = { exclude: [""] };

// Test default -> npm install with empty explude param
deepInstall(options);

// Test passing exclude params
options.exclude = [...options.exclude, "testDeep1"];
deepInstall(options);

// Test passing rootfolder
options.rootFolder = "./test";
deepInstall(options);

// Test passing skipRootFolder
options.skipRootFolder = false;
deepInstall(options);